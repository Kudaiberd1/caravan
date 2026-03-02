import Sidebar from "../layouts/Sidebar.tsx";
import downloadIcon from "../assets/icons/downloadIconWhite.svg";
import statIcon from "../assets/icons/statIcon.svg"
import alertIcon from "../assets/icons/alert.svg"
import groupIcon from "../assets/icons/groupIcon.svg"
import usersIcon from "../assets/icons/Users.svg"
import {useState} from "react";
import DepartmentCard from "../components/cards/DepartmentCard.tsx";
import {DensityLegend} from "../components/charts/DensityLegend.tsx";
import Footer from "../layouts/Footer.tsx";
import TabSwitcher from "../components/tabs/TabSwitcher.tsx";
import SmoothAreaChart from "../components/charts/SmoothAreaChart.tsx";
import { criticalDeviationsMock, departments} from "../data.ts";
import DateRangePillForWeek from "../components/selectElements/DateRangePillForWeek.tsx";
import MultiSelectDropdown from "../components/selectElements/MultiSelectDropdown.tsx";
import DepartmentLinesChart from "../components/charts/DepartmentLinesChart.tsx";
import MainNavbar from "../layouts/MainNavbar.tsx";
import {useOnLocationStore} from "../store/useOnLocationStore.ts";
import {useDepartmentHeatmapStore} from "../store/useDepartmentHeatmapStore.ts";
import {useAnomalyStore} from "../store/useAnomalyStore.ts";
import api from "../api/axiosInstance.ts";

export type DepartmentStaffing = {
    departmentId: string;
    departmentName: string;
    employeesOnLocation: number;
    employeesTotal: number;
};

export type CriticalDeviationRow = {
    id: string;
    employee: string;
    department: string;
    devHours: number;
    percent: number;
};

export interface SendReportType {
    reportType: string;
    recipientIds: number[];
    bodyText: string;
    subject: string;
}

const Dashboard = () => {

    const [active, setActive] = useState<number>(1);
    const [active1, setActive1] = useState<number>(1);

    const [selectedDeps, setSelectedDeps] = useState<string[]>(["general", "geology", "internal_control", "mining", "it", "heap_leaching", "logistics", "supply"]);

    const [criticalSearch, setCriticalSearch] = useState<string>("");
    const [notifyOpen, setNotifyOpen] = useState(false);
    const [notifySubject, setNotifySubject] = useState("");
    const [notifyAnomalyId, setNotifyAnomalyId] = useState<number | null>(null);
    const [notifyAnomaly, setNotifyAnomaly] = useState<typeof anomaly[number] | null>(null);

    const openNotify = (item: typeof anomaly[number]) => {
        setNotifyAnomaly(item);
        setNotifySubject("");
        setNotifyOpen(true);
    };

    const closeNotify = () => {
        setNotifyOpen(false);
        setNotifyAnomaly(null);
        setNotifySubject("");
    };
    const onLocation = useOnLocationStore((s) => s.onLocation);
    const heatmap = useDepartmentHeatmapStore((s) => s.heatmap);
    const anomaly = useAnomalyStore((s) => s.anomaly);
    const setAnomaly = useAnomalyStore((s) => s.setAnomaly);

    const filteredCriticalRows = criticalDeviationsMock.filter((row) => {
        const q = criticalSearch.trim().toLowerCase();
        if (!q) return true;
        return (
            row.employee.toLowerCase().includes(q) ||
            row.department.toLowerCase().includes(q)
        );
    });

    const handleAnomalyClick =  async (anomalyId: number) => {
        try{
            await api.put(`/anomaly/resolve/${anomalyId}`);
            setAnomaly(anomaly.filter((a) => a.anomalyId !== anomalyId));
        }catch (err) {
            console.error("Error resolving anomaly", err);
        }
    }

    const handleNotifySubmit = async (id: number) => {
        if (!notifyAnomaly) return;

        const payload: SendReportType = {
            reportType: "FEEDBACK_TO_SUPERVISOR",
            recipientIds: [id],
            bodyText: notifyAnomaly.description ?? "",
            subject: notifySubject,
        };

        if (!payload.subject.trim()) return;
        if (payload.recipientIds.length === 0) {
            console.error("Cannot send report: recipientIds is empty. Provide supervisorId in anomaly DTO.");
            return;
        }

        try {
            await api.post("/reports", payload);
            await api.put(`/anomaly/resolve/${notifyAnomalyId}`);
            setAnomaly(anomaly.filter((a) => a.anomalyId !== notifyAnomalyId));
        } catch (err) {
            console.error("Error sending notification", err);
        }
    };

    return (
        <div>
            <Sidebar/>
            <MainNavbar/>
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)] flex flex-col">
                <div className="flex-1">
                    <div className={"flex justify-between p-[20px]"}>
                        <div className={"space-y-2"}>
                            <h1 className={"text-3xl font-semibold"}>Контроль персонала</h1>
                            <p className={"text-sm text-gray-500"}> Глобальная производительность сайта и плотность
                                критически важного персонала </p>
                        </div>
                        <button
                            className={"px-4 py-2 bg-[rgb(49,57,91)] text-white text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-[rgb(40,48,80)]"}
                        >
                            <img src={downloadIcon} alt="filter" className={"h-3 inline-block mr-2"}/>
                            Экспорт отчета
                        </button>
                    </div>

                    <div className={"flex mt-[20px] gap-6 px-[20px] w-full items-stretch"}>
                        <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                            <div className={"flex justify-between items-start mb-[18px]"}>
                                <div className={"space-y-[7px]"}>
                                    <p className={"text-gray-500 font-semibold text-sm uppercase"}> Соблюдение графика смен </p>
                                    <h1 className={"text-[28px] font-bold"}> 98.5% </h1>
                                    <p className={"text-gray-500 text-[12px]"}> Совокупная производительность
                                        площадки </p>
                                </div>
                                <img src={statIcon} className={"w-[50px]"} alt={"statistic_icon"}/>
                            </div>
                            <div style={{background: `linear-gradient(to right, #4F5F93 ${98.5}%, #E5E7EB ${98.5}%)`}}
                                 className="h-2 w-full rounded-full mb-[34px]"/>
                        </div>

                        <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                            <div className={"flex justify-between items-start mb-[15px]"}>
                                <div className={"space-y-[7px]"}>
                                    <p className={"text-gray-500 font-semibold text-sm uppercase"}> Критические отклонения </p>
                                    <h1 className={"text-[28px] font-bold"}> {anomaly.length} <span
                                        className={"text-gray-500 text-[15px] font-normal"}> Оповещений </span></h1>
                                    <p className={"text-gray-500 text-[12px]"}>
                                        Разница во времени между сменами {">"} 2 часов
                                    </p>
                                </div>
                                <img src={alertIcon} className={"w-[50px]"} alt={"statistic_icon"}/>
                            </div>
                        </div>

                        <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                            <div className={"flex justify-between items-start mb-[18px]"}>
                                <div className={"space-y-[7px]"}>
                                    <p className={"text-gray-500 font-semibold text-sm uppercase"}> На Локации сейчас </p>
                                    <h1 className={"text-[28px] font-bold"}> {onLocation} </h1>
                                    <p className={"text-gray-500 text-[12px]"}> Распределено по 5 зонам </p>
                                </div>
                                <img src={groupIcon} className={"w-[50px]"} alt={"statistic_icon"}/>
                            </div>
                        </div>

                        <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                            <div className={"flex items-start justify-between mb-4"}>
                                <p className={"text-gray-500 font-semibold text-sm uppercase"}>
                                    Нарушения по отделам
                                </p>

                                <svg width="18" height="28" viewBox="0 0 18 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.6448 17.9526V16.497H13.5371L9.75256 12.7489L6.84138 15.6601L1.45569 10.238L2.4746 9.21908L6.84138 13.5859L9.75256 10.6747L14.556 15.4781V13.5859H16.0116V17.9526H11.6448Z"
                                        fill="#EF4444"/>
                                </svg>

                            </div>

                            <div className={"space-y-3 pb-6"}>
                                <div className={"flex items-center justify-between text-sm"}>
                                    <span className={"text-[#1F2A44]"}>Финансовый департамент</span>
                                    <span className={"font-semibold text-red-500"}>82.1%</span>
                                </div>

                                <div className={"flex items-center justify-between text-sm"}>
                                    <span className={"text-[#1F2A44]"}>Технологический департамент</span>
                                    <span className={"font-semibold text-red-500"}>85.4%</span>
                                </div>

                                <div className={"flex items-center justify-between text-sm"}>
                                    <span className={"text-[#1F2A44]"}>Металлургический департамент</span>
                                    <span className={"font-semibold text-amber-500"}>89.9%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"flex mt-[20px] gap-6 px-[20px] w-full items-stretch"}>
                        {/* cards */}
                        <div
                            className={"bg-white border-[2px] border-gray-200 rounded-xl px-[20px] w-full flex flex-col h-full"}>
                            <div className={"flex justify-between pt-[20px] items-center"}>
                                <div className={"flex gap-2"}>
                                <span className={"py-auto"}>
                                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14.4847 22.0763L8.82403 20.0951L4.43703 21.7933C4.12255 21.9191 3.83166 21.8837 3.56435 21.6872C3.29705 21.4906 3.16339 21.2272 3.16339 20.897V7.68888C3.16339 7.48446 3.22236 7.30364 3.34029 7.1464C3.45822 6.98916 3.61939 6.87123 3.8238 6.79261L8.82403 5.09442L14.4847 7.07564L18.8717 5.37745C19.1861 5.25166 19.477 5.28704 19.7443 5.48359C20.0116 5.68014 20.1453 5.94351 20.1453 6.27372V19.4819C20.1453 19.6863 20.0863 19.8671 19.9684 20.0243C19.8505 20.1816 19.6893 20.2995 19.4849 20.3781L14.4847 22.0763ZM13.5412 19.7649V8.72666L9.76747 7.40584V18.4441L13.5412 19.7649ZM15.4281 19.7649L18.2584 18.8215V7.6417L15.4281 8.72666V19.7649ZM5.05027 19.529L7.88059 18.4441V7.40584L5.05027 8.34928V19.529Z"
                                            fill="#475784"/>
                                    </svg>
                                </span>
                                    {active === 1 ?
                                        <p className={"font-semibold text-lg"}> Тепловая карта департаментов в реальном
                                            времени </p>
                                        :
                                        <p className={"font-semibold text-lg"}> Средняя посещаемость департаментов </p>
                                    }

                                </div>
                                <TabSwitcher text1={"В реальном времени"} text2={"Графика"} active={active}
                                             setActive={setActive}/>
                            </div>
                            <div className={"mb-4"}>
                                {active === 1 &&
                                    <div className={"flex items-center"}>
                                        <p className={"text-xl font-semibold text-[#475784]"}> Алмалы - 480 </p>
                                        <img src={usersIcon} className={"ms-2 h-4"}/>
                                    </div>
                                }
                            </div>

                            <div
                                className={"py-[20px] border border-dashed border-gray-300 rounded-lg mb-[20px] bg-gray-50 p-4 flex-1"}>
                                {active === 1 ?
                                    <div>
                                        <div className={"grid grid-cols-2 gap-2"}>
                                            {heatmap.map((dept) =>
                                                <DepartmentCard key={dept.departmentId} staffing={dept}/>
                                            )}
                                        </div>
                                        <DensityLegend/>
                                    </div>
                                    :
                                    <div className={"px-8 mb-auto pb-19"}>
                                        {/* Controllers */}
                                        <div className={"flex justify-between mb-7"}>
                                            <DateRangePillForWeek />
                                            <MultiSelectDropdown
                                                title="Департаменты"
                                                options={departments}
                                                value={selectedDeps}
                                                onChange={setSelectedDeps}
                                            />
                                        </div>

                                        {/* Graph */}
                                        <div>
                                            <DepartmentLinesChart
                                                departments={departments as never}
                                                selectedIds={selectedDeps as never}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        {/* right side graph */}
                        <div className={"p-5 bg-white rounded-xl border-[2px] border-gray-200 flex flex-col"}>
                            <div className={"flex items-center gap-2 mb-3"}>
                                <svg className={"my-auto h-8 w-8"} width="24" height="28" viewBox="0 0 24 28"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.1626 22.0674V20.1813L5.04869 18.2952V22.0674H3.1626ZM6.93478 22.0674V16.4091L8.82088 14.523V22.0674H6.93478ZM10.707 22.0674V14.523L12.5931 16.4327V22.0674H10.707ZM14.4792 22.0674V16.4327L16.3652 14.5466V22.0674H14.4792ZM18.2513 22.0674V12.6369L20.1374 10.7508V22.0674H18.2513ZM3.1626 17.1871V14.523L9.76392 7.92168L13.5361 11.6939L20.1374 5.09254V7.75665L13.5361 14.358L9.76392 10.5858L3.1626 17.1871Z"
                                        fill="#475784"/>
                                </svg>
                                <p className={"font-semibold "}> Тенденция соответствия рабочему графику </p>
                            </div>
                            <div className={"mb-5"}>
                                <TabSwitcher text1={"Еженедельно"} text2={"Ежемесячно"} active={active1}
                                             setActive={setActive1}/>
                            </div>
                            <div className={"mb-7 flex-1"}>
                                <SmoothAreaChart/>
                            </div>
                            <div className={"mt-auto"}>
                                <div className={"flex justify-between bg-gray-50 p-2 rounded-lg mb-3"}>
                                    <p> Среднее соответствие </p>
                                    <p className={"text-green-700"}> 94.2% </p>
                                </div>
                                <div className={"flex justify-between bg-gray-50 p-2 rounded-lg"}>
                                    <p> Частота аномалий </p>
                                    <p className={"text-red-700"}> +12% vs LW </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"flex gap-6 m-[20px] h-[400px] items-stretch"}>

                        <div className={"bg-white border-[2px] border-gray-200 rounded-xl overflow-hidden w-full h-full flex flex-col"}>
                            <div className={"px-7 py-4 bg-gray-50"}>
                                <div className={"flex justify-between"}>
                                    <h1 className={"text-xl font-semibold"}>
                                        Таблица критических отклонений за этот месяц
                                    </h1>
                                    <span className={"ps-2 text-[13px] text-gray-500 font-semibold"}>ТОП-10 ЗНАЧИМЫХ</span>
                                </div>
                                <div className={"mt-3"}>
                                    <div className={"relative"}>
                                        <span className={"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                        </span>
                                        <input
                                            value={criticalSearch}
                                            onChange={(e) => setCriticalSearch(e.target.value)}
                                            placeholder={"Быстрый поиск по идентификатору или имени сотрудника..."}
                                            className={"w-full bg-white border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={"border-t border-gray-200"} />

                            <div className={"px-7 flex-1 overflow-y-auto"}>
                                <table className={"w-full border-collapse"}>
                                    <thead>
                                    <tr className={"text-left text-[11px] uppercase tracking-wide text-gray-500 sticky top-0 bg-white"}>
                                        <th className={"py-3"}>Сотрудник</th>
                                        <th className={"py-3"}>Отдел</th>
                                        <th className={"py-3"}>DEV (ч)</th>
                                        <th className={"py-3 text-right"}>%</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {filteredCriticalRows.map((row) => {
                                        const isNeg = row.devHours < 0;
                                        const devText = `${isNeg ? "" : "+"}${row.devHours.toFixed(1)}ч`;
                                        const percentText = `${row.percent.toFixed(1)}%`;

                                        return (
                                            <tr key={row.id} className={"border-t border-gray-100"}>
                                                <td className={"py-4 text-sm text-gray-900"}>{row.employee}</td>
                                                <td className={"py-4 text-sm text-gray-500"}>{row.department}</td>
                                                <td className={"py-4 text-sm font-semibold"}>
                                                    <span className={isNeg ? "text-red-600" : "text-green-600"}>{devText}</span>
                                                </td>
                                                <td className={"py-4 text-right"}>
                                                    <span
                                                        className={
                                                            "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 " +
                                                            (row.percent < 100 ? "text-red-600" : "text-green-700")
                                                        }
                                                    >
                                                        {percentText}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={"bg-white border-[2px] border-gray-200 rounded-xl overflow-hidden w-full h-full flex flex-col"}>
                            <div className={"px-7 py-4 bg-gray-50"}>
                                <div className={"flex justify-between"}>
                                    <div className={"text-xl font-semibold flex text-center items-center"}>
                                        <svg className={"my-auto"} width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.6541 18.3025C11.6541 18.3025 11.7209 18.3025 11.8546 18.3025C11.9883 18.3025 12.1455 18.2121 12.3263 18.0313C12.5071 17.8504 12.5976 17.6264 12.5976 17.359C12.5976 17.0917 12.5071 16.8677 12.3263 16.6868C12.1455 16.506 11.9214 16.4156 11.6541 16.4156C11.3868 16.4156 11.1627 16.506 10.9819 16.6868C10.8011 16.8677 10.7107 17.0917 10.7107 17.359C10.7107 17.6264 10.8011 17.8504 10.9819 18.0313C11.1627 18.2121 11.3868 18.3025 11.6541 18.3025ZM10.7107 14.5287H12.5976V8.8681H10.7107V14.5287ZM11.6541 23.0197C10.349 23.0197 9.12256 22.772 7.97471 22.2767C6.82686 21.7814 5.82838 21.1092 4.97929 20.2601C4.13019 19.411 3.45799 18.4126 2.96268 17.2647C2.46738 16.1169 2.21973 14.8904 2.21973 13.5853C2.21973 12.2802 2.46738 11.0537 2.96268 9.90588C3.45799 8.75803 4.13019 7.75955 4.97929 6.91046C5.82838 6.06137 6.82686 5.38916 7.97471 4.89386C9.12256 4.39855 10.349 4.1509 11.6541 4.1509C12.9592 4.1509 14.1857 4.39855 15.3335 4.89386C16.4814 5.38916 17.4799 6.06137 18.329 6.91046C19.178 7.75955 19.8502 8.75803 20.3456 9.90588C20.8409 11.0537 21.0885 12.2802 21.0885 13.5853C21.0885 14.8904 20.8409 16.1169 20.3456 17.2647C19.8502 18.4126 19.178 19.411 18.329 20.2601C17.4799 21.1092 16.4814 21.7814 15.3335 22.2767C14.1857 22.772 12.9592 23.0197 11.6541 23.0197ZM11.6541 21.1328C13.7611 21.1328 15.5458 20.4016 17.0081 18.9393C18.4705 17.477 19.2016 15.6923 19.2016 13.5853C19.2016 11.4783 18.4705 9.69361 17.0081 8.23127C15.5458 6.76894 13.7611 6.03778 11.6541 6.03778C9.54711 6.03778 7.76243 6.76894 6.3001 8.23127C4.83777 9.69361 4.10661 11.4783 4.10661 13.5853C4.10661 15.6923 4.83777 17.477 6.3001 18.9393C7.76243 20.4016 9.54711 21.1328 11.6541 21.1328Z" fill="#EF4444"/>
                                        </svg>

                                        <h1 className={"ps-2"}> Активные аномалии </h1>
                                    </div>
                                    <span className={"ps-2 text-[13px] text-gray-500 font-semibold"}>Лента новостей в реальном времени</span>
                                </div>
                            </div>

                            <div className={"border-t border-gray-200"} />
                            <div className={"flex-1 min-h-0"}>
                                <div className={"px-5 py-4 h-full"}>
                                    <div className={"h-full overflow-y-auto pr-1 space-y-3"}>
                                        {anomaly.map((item) => {
                                            const accentClass =
                                                item.priorityLabel === "НЕМЕДЛЕННЫЙ"
                                                    ? "bg-red-500"
                                                    : item.priorityLabel === "СЕРЕДИНА"
                                                        ? "bg-amber-500"
                                                        : "bg-gray-300";

                                            const badgeClass =
                                                item.priorityLabel === "НЕМЕДЛЕННЫЙ"
                                                    ? "text-red-600"
                                                    : item.priorityLabel === "СЕРЕДИНА"
                                                        ? "text-amber-600"
                                                        : "text-gray-400";

                                            return (
                                                <div
                                                    key={item.anomalyId}
                                                    className={
                                                        "relative rounded-xl border border-gray-200 overflow-hidden " +
                                                        (item.priorityLabel === "НЕМЕДЛЕННЫЙ"
                                                            ? "bg-red-50"
                                                            : item.priorityLabel === "СЕРЕДИНА"
                                                                ? "bg-amber-50"
                                                                : "bg-white")
                                                    }
                                                >
                                                    <div className={"absolute left-0 top-0 h-full w-1 " + accentClass} />

                                                    <div className={"p-4 pl-5"}>
                                                        <div className={"flex items-start justify-between gap-4"}>
                                                            <div className={"space-y-1"}>
                                                                <p className={"font-semibold text-[15px] text-gray-900"}>{item.departmentName}</p>
                                                                <p className={"text-[12.5px] text-gray-500"}>{item.description}</p>
                                                            </div>

                                                            <div className={"text-[12px] font-semibold " + badgeClass}>{item.priorityLabel}</div>
                                                        </div>

                                                        <div className={"mt-3 items-center gap-2 flex-wrap grid grid-cols-3"}>
                                                            <button
                                                                type="button"
                                                                onClick={() => {openNotify(item); setNotifyAnomalyId(item.anomalyId)}}
                                                                className={"px-4 py-2 rounded-lg text-[12px] font-semibold border min-w-[140px] border-gray-200 text-gray-900 bg-white col-span-2 cursor-pointer transition-all duration-150 hover:shadow-md"}
                                                            >
                                                                Уведомить руководителя
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleAnomalyClick(item.anomalyId)}
                                                                className={
                                                                    "px-4 py-2 rounded-lg text-[12px] font-semibold border min-w-[140px] cursor-pointer transition-all duration-150 hover:shadow-md " +
                                                                    (item.priorityLabel === "НЕМЕДЛЕННЫЙ"
                                                                        ? "border-red-200 text-red-600 bg-white"
                                                                        : item.priorityLabel === "СЕРЕДИНА"
                                                                            ? "bg-amber-500 text-white border-amber-500"
                                                                            : "border-gray-200 text-gray-400 bg-gray-50")
                                                                }
                                                            >
                                                                Оправдать
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {notifyOpen && notifyAnomaly && (
                    <div
                        className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center px-4"
                        onMouseDown={closeNotify}
                    >
                        <div
                            className="w-full max-w-[720px] rounded-2xl bg-white shadow-2xl overflow-hidden"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                <div>
                                    <h3 className="text-lg font-semibold">Уведомить руководителя</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Авто-заполнение по аномалии • Редактируется только тема</p>
                                </div>
                                <button
                                    type="button"
                                    className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                    onClick={closeNotify}
                                    aria-label="close"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="px-6 py-5 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-700 mb-2">Сотрудник</div>
                                        <input
                                            value={notifyAnomaly.employeeName ?? "—"}
                                            disabled
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-700 mb-2">Приоритет</div>
                                        <input
                                            value={notifyAnomaly.priorityLabel ?? "—"}
                                            disabled
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-700 mb-2">Тема</div>
                                    <input
                                        value={notifySubject}
                                        onChange={(e) => setNotifySubject(e.target.value)}
                                        placeholder="Введите тему уведомления..."
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                                    />
                                </div>

                                <div>
                                    <div className="text-sm text-gray-700 mb-2">Описание (авто)</div>
                                    <textarea
                                        value={notifyAnomaly.description ?? ""}
                                        disabled
                                        rows={4}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700 resize-none"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        className="px-6 py-2.5 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold hover:bg-gray-200"
                                        onClick={closeNotify}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!notifySubject.trim()}
                                        className={
                                            "px-6 py-2.5 rounded-full text-white text-sm font-semibold " +
                                            (!notifySubject.trim()
                                                ? "bg-[rgb(49,57,91)]/50 cursor-not-allowed"
                                                : "bg-[rgb(49,57,91)] hover:bg-[rgb(40,48,80)]")
                                        }
                                        onClick={() => {
                                            handleNotifySubmit(notifyAnomaly?.anomalyId);
                                            closeNotify();
                                        }}
                                    >
                                        Отправить
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

export default Dashboard;