import Sidebar from "../layouts/Sidebar.tsx";
import Navbar from "../layouts/Navbar.tsx";
import Footer from "../layouts/Footer.tsx";
import {useEffect, useMemo, useState} from "react";
import DateRangePill from "../components/selectElements/DateRangePill.tsx";
import downloadIcon from "../assets/icons/downloadIconWhite.svg";
import {format, parseISO, startOfDay, endOfDay, isWithinInterval} from "date-fns";
import api from "../api/axiosInstance.ts";
import {formatTimeAgo, normalizeIsoDateTime} from "../services/normalizeIsoDateTime.ts";
import {toggleSelectAllOnPage, toggleSelectOnePage} from "../services/toggleSelectPage.ts";
import {TableSkeleton} from "../components/others/TableSkeleton.tsx";

interface Props {
    dateFrom: string | null;
    dateTo: string | null;
    reportType: string | null;
}

interface ReportRecipient {
    employeeId: number;
    fullName: string;
}

interface ReportRow {
    id: string;
    reportType: "WHATSAPP_MAILING" | "FEEDBACK_TO_SUPERVISOR";
    recipients: ReportRecipient[];
    subject: string;
    bodyText: string;
    lastModifiedDate: string;
}

const Reports = () => {

    const [filter, setFilter] = useState<Props>({dateFrom: null, dateTo: null, reportType: null});
    const [criticalSearch, setCriticalSearch] = useState<string>("");

    const [reports, setReports] = useState<ReportRow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedReportIds, setSelectedReportIds] = useState<string[]>([]);

    const [reportPopupOpen, setReportPopupOpen] = useState(false);
    const [reportPopupMode, setReportPopupMode] = useState<"view" | "edit">("view");
    const [activeReportId, setActiveReportId] = useState<string | null>(null);

    const activeReport = useMemo(() => {
        if (!activeReportId) return null;
        return reports.find((r) => r.id === activeReportId) ?? null;
    }, [activeReportId, reports]);

    const [popupEmployees, setPopupEmployees] = useState<string[]>([]);
    const [popupSubject, setPopupSubject] = useState<string>("");
    const [popupDescription, setPopupDescription] = useState<string>("");

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [detailsReportId, setDetailsReportId] = useState<string | null>(null);

    const detailsReport = useMemo(() => {
        if (!detailsReportId) return null;
        return reports.find((r) => r.id === detailsReportId) ?? null;
    }, [detailsReportId, reports]);

    const openDetails = (id: string) => {
        setDetailsReportId(id);
        setDetailsOpen(true);
    };

    const closeDetails = () => {
        setDetailsOpen(false);
        setDetailsReportId(null);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(true);
        api.get("/reports")
            .then((res) => {
                setReports(res.data);
            })
            .catch((e) => {
                console.error("Failed to load reports", e);
                setReports([]);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const openReportPopup = (id: string) => {
        const r = reports.find((x) => x.id === id);
        if (!r) return;
        setActiveReportId(id);
        setPopupEmployees(r.recipients.map((e) => e.fullName));
        setPopupSubject(r.subject ?? "");
        setPopupDescription(r.bodyText);
        setReportPopupMode("view");
        setReportPopupOpen(true);
    };

    const closeReportPopup = () => {
        setReportPopupOpen(false);
        setActiveReportId(null);
        setReportPopupMode("view");
        setPopupEmployees([]);
        setPopupSubject("");
        setPopupDescription("");
    };

    const onDeleteReport = async () => {
        try{
            api.put(`/reports/${activeReportId}/resolve`);
            if (!activeReportId) return;
            setReports((prev) => prev.filter((r) => r.id !== activeReportId));
            closeReportPopup();
        }catch (err){
            console.error("Failed to delete report", err);
        }
    };

    const onSaveReport = () => {
        if (!activeReportId) return;
        if (popupEmployees.length === 0) return;
        setReports((prev) =>
            prev.map((r) =>
                r.id === activeReportId
                    ? {
                        ...r,
                        subject: popupSubject,
                        bodyText: popupDescription,
                        recipients: popupEmployees.map((name, index) => ({
                            employeeId: index,
                            fullName: name,
                        })),
                    }
                    : r
            )
        );
        setReportPopupMode("view");
    };

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const filteredReports = useMemo(() => {
        const q = criticalSearch.trim().toLowerCase();

        return reports.filter((r) => {
            if (filter.reportType && r.reportType !== filter.reportType) return false;

            if (filter.dateFrom && filter.dateTo) {
                const d = parseISO(normalizeIsoDateTime(r.lastModifiedDate));
                const start = startOfDay(parseISO(filter.dateFrom));
                const end = endOfDay(parseISO(filter.dateTo));

                if (!isWithinInterval(d, {start, end})) return false;
            }

            if (!q) return true;
            const hay = (
                r.bodyText + " " + r.recipients.map((e) => e.fullName).join(" ")
            ).toLowerCase();
            return hay.includes(q);
        });
    }, [reports, criticalSearch, filter.dateFrom, filter.dateTo, filter.reportType]);

    const pageIds = filteredReports.map((r) => r.id);
    const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedReportIds.includes(id));
    const anyOnPageSelected = pageIds.some((id) => selectedReportIds.includes(id));

    const typeLabel = (t: ReportRow["reportType"]) => (t !== "FEEDBACK_TO_SUPERVISOR" ? "Whatsapp рассылка" : "Комментарий руководителю");

    const handleDeleteSelectedReports = async () => {
        try{
            for(const id of selectedReportIds) {
                api.put(`/reports/${id}/resolve`);
            }
            setReports((prev) => prev.filter((r) => !selectedReportIds.includes(r.id)));
            setSelectedReportIds([]);
        }catch (err) {
            console.error("Failed to delete reports", err);
        }
    }

    return (
        <div>
            <Sidebar/>
            <Navbar/>
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)] flex flex-col">
                <div className="flex-1">
                    <div className={"space-y-2 p-[20px]"}>
                        <h1 className={"text-3xl font-semibold"}>Отчеты</h1>
                        <p className={"text-sm text-gray-500"}> Объявления о техническом обслуживании системы </p>

                        <div className={"flex justify-between"}>
                            <div className={"flex gap-3"}>
                                <DateRangePill
                                    value={filter.dateFrom && filter.dateTo
                                        ? {from: parseISO(filter.dateFrom), to: parseISO(filter.dateTo)}
                                        : undefined
                                    }
                                    onChange={(range) => {
                                        if (range?.from && range?.to) {
                                            setFilter({
                                                ...filter,
                                                dateFrom: format(range.from, "yyyy-MM-dd"),
                                                dateTo: format(range.to, "yyyy-MM-dd"),
                                            });
                                        } else {
                                            setFilter({
                                                ...filter,
                                                dateFrom: null,
                                                dateTo: null,
                                            });
                                        }
                                    }}
                                />
                                <select
                                    value={filter.reportType ?? ""}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setFilter({...filter, reportType: v === "" ? null : v});
                                    }}
                                    className={"px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent"}
                                >
                                    <option value={""}>Тип отчета</option>
                                    <option value={"WHATSAPP_MAILING"}>Whatsapp рассылка</option>
                                    <option value={"FEEDBACK_TO_SUPERVISOR"}>Комментарий руководителю</option>
                                </select>
                                {selectedReportIds.length > 0 && (
                                    <button
                                        onClick={() => handleDeleteSelectedReports()}
                                        className={"bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg transition-all duration-200"}>
                                        Delete
                                    </button>
                                )}
                            </div>

                            <div className={"flex gap-3"}>
                                <div className={"relative"}>
                                        <span
                                            className={"h-[17px] absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round"/>
                                                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                        </span>
                                    <input
                                        value={criticalSearch}
                                        onChange={(e) => setCriticalSearch(e.target.value)}
                                        placeholder={"Поиск"}
                                        className={"w-full bg-white border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"}
                                    />
                                </div>
                                <button
                                    className={"px-4 py-2 bg-[rgb(49,57,91)] text-white text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-[rgb(40,48,80)]"}
                                >
                                    <img src={downloadIcon} alt="filter" className={"h-3 inline-block mr-2"}/>
                                    Экспорт отчета
                                </button>
                            </div>
                        </div>

                        <div className={"mt-3 rounded-xl bg-white border border-gray-200 overflow-hidden"}>
                            <div className={"w-full overflow-x-auto"}>
                                <table className={"w-full border-collapse"}>
                                    <thead>
                                    <tr className={"bg-gray-50 text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-200"}>
                                        <th className={"py-3 px-4 w-[44px]"}>
                                            <button
                                                type="button"
                                                onClick={() => toggleSelectAllOnPage(pageIds, allOnPageSelected, setSelectedReportIds)}
                                                className={
                                                    "h-4 w-4 rounded border flex items-center justify-center " +
                                                    (allOnPageSelected ? "border-blue-600" : anyOnPageSelected ? "border-blue-600" : "border-gray-300")
                                                }
                                                aria-label="select all"
                                            >
                                                {allOnPageSelected &&
                                                    <span className="h-2 w-2 rounded-sm bg-blue-600"/>}
                                                {!allOnPageSelected && anyOnPageSelected &&
                                                    <span className="h-0.5 w-2 bg-blue-600"/>}
                                            </button>
                                        </th>
                                        <th className={"py-3 pr-3 text-left"}>Тип</th>
                                        <th className={"py-3 px-3 text-left"}>Сотрудники</th>
                                        <th className={"py-3 px-3 text-left"}>Описание</th>
                                        <th className={"py-3 px-3 text-left"}>Дата</th>
                                        <th className={"py-3 px-4 text-right"}>Действия</th>
                                    </tr>
                                    </thead>

                                    {isLoading ? (
                                        <TableSkeleton rows={8}/>
                                    ) : (
                                        <tbody>
                                        {filteredReports.map((row) => {
                                            const selected = selectedReportIds.includes(row.id);
                                            const names = row.recipients.map((e) => e.fullName);
                                            const employeesText =
                                                names.length <= 2
                                                    ? names.join(", ")
                                                    : `${names[0]}, ${names[1]} и еще ${names.length - 2}`;

                                            return (
                                                <tr key={row.id}
                                                    className={"border-b border-gray-100 hover:bg-gray-50/60"}>
                                                    <td className={"py-4 px-4"}>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleSelectOnePage(row.id, setSelectedReportIds)}
                                                            className={
                                                                "h-4 w-4 rounded-full border flex items-center justify-center " +
                                                                (selected ? "border-blue-600" : "border-gray-300")
                                                            }
                                                            aria-label="select row"
                                                        >
                                                            {selected &&
                                                                <span className="h-2 w-2 rounded-full bg-blue-600"/>}
                                                        </button>
                                                    </td>

                                                    <td className={"py-4 pr-3 cursor-pointer"} onClick={() => openDetails(row.id)}>
                                                        <div
                                                            className={"text-sm text-gray-600"}>{typeLabel(row.reportType)}</div>
                                                    </td>

                                                    <td className={"py-4 px-3"}>
                                                        <div className={"text-sm text-gray-900"}>{employeesText}</div>
                                                    </td>

                                                    <td className={"py-4 px-3"}>
                                                        <div className={"text-sm text-gray-600"}>{row.subject}</div>
                                                    </td>

                                                    <td className={"py-4 px-3"}>
                                                        <div
                                                            className={"text-sm text-gray-500"}>{formatTimeAgo(row.lastModifiedDate)}</div>
                                                    </td>

                                                    <td className={"py-4 px-4 text-right"}>
                                                        <button
                                                            type="button"
                                                            className={"h-9 w-9 rounded-full hover:bg-gray-100 inline-flex items-center justify-center"}
                                                            aria-label="actions"
                                                            onClick={() => openReportPopup(row.id)}
                                                        >
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="12" cy="5" r="1.6" fill="#9CA3AF"/>
                                                                <circle cx="12" cy="12" r="1.6" fill="#9CA3AF"/>
                                                                <circle cx="12" cy="19" r="1.6" fill="#9CA3AF"/>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {filteredReports.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className={"py-10 text-center text-sm text-gray-500"}>
                                                    Нет данных по выбранным фильтрам
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {reportPopupOpen && activeReport && (
                    <div className={"fixed inset-0 z-[999] bg-black/40 flex items-center justify-center px-4"}>
                        <div className={"w-full max-w-[760px] rounded-2xl bg-white shadow-2xl overflow-hidden"}>
                            <div className={"flex items-center justify-between px-6 py-4 border-b border-gray-200"}>
                                <h3 className={"text-lg font-semibold"}>Отправить отзыв</h3>
                                <button
                                    type="button"
                                    className={"h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"}
                                    onClick={closeReportPopup}
                                    aria-label="close"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>

                            <div className={"px-6 py-5"}>
                                <div className={"flex items-start gap-3"}>
                                    <div className={"text-sm text-gray-600 w-[56px] pt-2"}>Для:</div>
                                    <div className={"flex flex-wrap gap-2"}>
                                        {popupEmployees.map((name) => (
                                            <div key={name}
                                                 className={"inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-xs"}>
                                                <span className={"text-gray-700"}>{name}</span>
                                                {reportPopupMode === "edit" && (
                                                    <button
                                                        type="button"
                                                        className={
                                                            "text-red-500 hover:text-red-600 " +
                                                            (popupEmployees.length <= 1 ? "opacity-40 cursor-not-allowed" : "")
                                                        }
                                                        disabled={popupEmployees.length <= 1}
                                                        onClick={() => setPopupEmployees((prev) => prev.filter((x) => x !== name))}
                                                        aria-label="remove"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={"mt-5"}>
                                    <div className={"text-sm text-gray-700 mb-2"}>Тема:</div>
                                    <input
                                        value={popupSubject}
                                        onChange={(e) => setPopupSubject(e.target.value)}
                                        disabled={reportPopupMode === "view"}
                                        className={
                                            "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200 " +
                                            (reportPopupMode === "view" ? "bg-gray-50" : "bg-white")
                                        }
                                    />
                                </div>

                                <div className={"mt-4"}>
                                    <div className={"text-sm text-gray-700 mb-2"}>Описание:</div>
                                    <input
                                        value={popupDescription}
                                        onChange={(e) => setPopupDescription(e.target.value)}
                                        disabled={reportPopupMode === "view"}
                                        className={
                                            "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200 " +
                                            (reportPopupMode === "view" ? "bg-gray-50" : "bg-white")
                                        }
                                    />
                                    {reportPopupMode === "edit" && popupEmployees.length === 0 && (
                                        <div className="mt-2 text-xs text-red-600">Добавьте хотя бы одного получателя</div>
                                    )}
                                </div>


                                {reportPopupMode === "view" ? (
                                    <div className={"mt-6 flex items-center justify-between"}>
                                        <button
                                            type="button"
                                            className={"px-8 py-2.5 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600"}
                                            onClick={onDeleteReport}
                                        >
                                            Удалить
                                        </button>

                                        <button
                                            type="button"
                                            className={"px-8 py-2.5 rounded-full bg-[rgb(49,57,91)] text-white text-sm font-semibold hover:bg-[rgb(40,48,80)] inline-flex items-center gap-2"}
                                            onClick={() => setReportPopupMode("edit")}
                                        >
                                            Редактировать
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 20h9" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round"/>
                                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
                                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                      strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className={"mt-6 flex items-center justify-between"}>
                                        <button
                                            type="button"
                                            className={"px-8 py-2.5 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600"}
                                            onClick={() => {
                                                // revert to original values
                                                setPopupEmployees(activeReport?.recipients.map((e) => e.fullName) ?? []);
                                                setPopupSubject(activeReport?.subject ?? "");
                                                setPopupDescription(activeReport?.bodyText);
                                                setReportPopupMode("view");
                                            }}
                                        >
                                            Отменить
                                        </button>

                                        <button
                                            type="button"
                                            disabled={popupEmployees.length === 0}
                                            className={
                                                "px-8 py-2.5 rounded-full text-white text-sm font-semibold inline-flex items-center gap-2 " +
                                                (popupEmployees.length === 0
                                                    ? "bg-[rgb(49,57,91)]/50 cursor-not-allowed"
                                                    : "bg-[rgb(49,57,91)] hover:bg-[rgb(40,48,80)]")
                                            }
                                            onClick={onSaveReport}
                                        >
                                            Сохранить Изменения
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 20h9" stroke="currentColor" strokeWidth="2"
                                                      strokeLinecap="round"/>
                                                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
                                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                      strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {detailsOpen && detailsReport && (
                    <div className="fixed inset-0 z-[998] bg-black/40 flex items-center justify-center px-4" onMouseDown={closeDetails}>
                        <div
                            className="w-full max-w-[820px] rounded-2xl bg-white shadow-2xl overflow-hidden"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                <div>
                                    <h3 className="text-lg font-semibold">Отчет</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {typeLabel(detailsReport.reportType)} • {format(parseISO(normalizeIsoDateTime(detailsReport.lastModifiedDate)), "dd.MM.yyyy HH:mm")}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                    onClick={closeDetails}
                                    aria-label="close"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="px-6 py-5 space-y-5">
                                <div>
                                    <div className="text-sm text-gray-700 mb-2">Получатели</div>
                                    <div className="flex flex-wrap gap-2">
                                        {detailsReport.recipients.map((r) => (
                                            <span
                                                key={r.employeeId + r.fullName}
                                                className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 bg-white text-xs text-gray-700"
                                            >
                                                {r.fullName}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-700 mb-2">Описание</div>
                                    <div className="text-sm text-gray-900 font-medium break-words">{detailsReport.subject || "—"}</div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-700 mb-2">Текст</div>
                                    <div className="text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed bg-gray-50 border border-gray-200 rounded-xl p-4">
                                        {detailsReport.bodyText || "—"}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        className="px-6 py-2.5 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold hover:bg-gray-200"
                                        onClick={closeDetails}
                                    >
                                        Закрыть
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-2.5 rounded-full bg-[rgb(49,57,91)] text-white text-sm font-semibold hover:bg-[rgb(40,48,80)]"
                                        onClick={() => {
                                            closeDetails();
                                            openReportPopup(detailsReport.id);
                                        }}
                                    >
                                        Действия
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Footer/>
            </div>
        </div>
    )
}

export default Reports;