import Sidebar from "../../layouts/Sidebar.tsx";
import Navbar from "../../layouts/Navbar.tsx";
import filterIcon from "../../assets/icons/filterIcon.svg";
import downloadIcon from "../../assets/icons/downloadIcon.svg";
import {departments, mockPersonnel} from "../../data.ts";
import {useMemo, useState} from "react";
import TabSwitcher from "../../components/TabSwitcher.tsx";
import backIcon from "../../assets/icons/backIcon.svg";
import Footer from "../../layouts/Footer.tsx";
import cancelIcon from "../../assets/icons/cancelIcon.svg";
import MultipleTabSwitcher from "../../components/MultipleTabSwitcher.tsx";
import MultiSelectDropdown from "../../components/MultiSelectDropdown.tsx";
import SpiderChart from "../../components/charts/SpiderChart.tsx";
import DivergingBarChart from "../../components/charts/DivergingBarChart.tsx";
import {usePersonnelFilters} from "../../hooks/usePersonnelFilters.ts";
import {useSelection} from "../../hooks/useSelection.ts";
import {useAdvancedFilters} from "../../hooks/useAdvancedFilters.ts";
import PersonnelTable from "./components/PersonnelTable.tsx";
import Pagination from "./components/Pagination.tsx";
import SelectedEmployeesBar from "./components/SelectedEmployeesBar.tsx";
const Performance = () => {

    const [activeTab, setActiveTab] = useState<number>(1);
    const [criticalSearch, setCriticalSearch] = useState<string>("");
    const [isChecking, setIsChecking] = useState<boolean>(false);

    const { response, setPage } = usePersonnelFilters({
        data: mockPersonnel,
        activeTab,
        search: criticalSearch,
        pageSize: 10,
    });

    const {
        selectedRows,
        setSelectedRows,
        selectedManagerIds,
        setSelectedManagerIds,
        toggleSelectedRows,
        toggleSelectedManager,
    } = useSelection({
        activeTab,
        isChecking,
    });

    const {
        tabs,
        open: additionalFilter,
        setOpen: setAdditionalFilter,
        activeCityTab: activeTab1,
        setActiveCityTab: setActiveTab1,
        selectedDepartments,
        toggleSelectedDepartment,
        closeAndResetDepartments,
    } = useAdvancedFilters();

    const managerOptions = useMemo(() => {
        return mockPersonnel
            .filter((p) => p.position === "rukovoditel")
            .map((p) => ({id: p.id, label: p.fullName}));
    }, []);


    const managerTitle = useMemo(() => {
        if (selectedManagerIds.length === 0) return "Выберите руководителя";
        const firstName = managerOptions.find((o) => o.id === selectedManagerIds[0])?.label ?? "Руководитель";
        if (selectedManagerIds.length === 1) return firstName;
        return `${firstName} и еще ${selectedManagerIds.length - 1}`;
    }, [managerOptions, selectedManagerIds]);


    return (
        <div>
            <Sidebar/>
            <Navbar/>
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)] flex flex-col">
                <div className="flex-1">
                    <div className={"flex justify-between p-[20px]"}>
                        <div className={"space-y-2"}>
                            <h1 className={"text-3xl font-semibold"}>Панель мониторинга</h1>
                            <p className={"text-sm text-gray-500"}> Отдел: Горнодобывающие операции • Анализ
                                коллективной эффективности • Февраль 2026 г. </p>
                        </div>
                        <div className={"flex gap-3"}>
                            <button
                                className={"px-4 py-2 bg-white text-[rgb(49,57,91)] text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-white"}>
                                <img src={downloadIcon} alt="download" className={"inline-block mr-2"}/>
                                Экспорт
                            </button>
                            <button
                                className={"px-4 py-2 bg-[rgb(49,57,91)] text-white text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-[rgb(40,48,80)]"}
                                onClick={() => { setAdditionalFilter((v) => !v); setIsChecking(false); }}
                            >
                                <img src={filterIcon} alt="filter" className={"inline-block mr-2"}/>
                                Расширенные фильтры
                            </button>
                        </div>
                    </div>

                    <div className={"mt-[20px] px-[20px]"}>
                        <div className={"grid grid-cols-6 grid-rows-5 gap-4"}>

                            <div className={"col-span-4 row-span-5"}>
                                {additionalFilter &&
                                    <div className={"p-[20px] bg-white mb-4 rounded-xl border border-gray-200"}>
                                        <div className={"flex font-[450] justify-between items-center"}>
                                            <p className={"text-sm text-gray-500"}> ГОРОД </p>
                                            <img src={cancelIcon} alt="cancel" onClick={closeAndResetDepartments}/>
                                        </div>
                                        <MultipleTabSwitcher tabs={tabs} active={activeTab1} setActive={setActiveTab1}/>
                                        <p className={"text-sm text-gray-500 font-[450] mt-6"}> ДЕПАРТАМЕНТ </p>
                                        <div className={"flex flex-wrap items-center gap-3 mt-3"}>
                                            {departments.map((department, index) => (
                                                <div key={index}
                                                     className={`border rounded-md border-gray-200 px-1 cursor-pointer ${selectedDepartments.includes(index) && "bg-green-100 border-green-500"}`}
                                                     onClick={() => toggleSelectedDepartment(index)}>
                                                    {department.label}
                                                </div>
                                            ))
                                            }
                                        </div>
                                    </div>
                                }
                                <div className={"border border-gray-200 rounded-xl bg-white w-full"}>
                                    <div className={""}>
                                        <div className={"flex flex-wrap gap-3 justify-between p-[20px] items-center"}>
                                            <h1 className={"text-lg"}>
                                                {isChecking ?
                                                    <span className={"flex items-center"}>
                                                        <img src={backIcon} alt="back" className={"mr-5 cursor-pointer"}
                                                             onClick={() => {
                                                                 setActiveTab(2);
                                                                 setIsChecking(false)
                                                             }}/>
                                                        Команда руководителя
                                                    </span>
                                                    :
                                                    "Справочник"
                                                }
                                            </h1>
                                            <div className={"flex gap-2"}>
                                                {isChecking ?
                                                    <MultiSelectDropdown
                                                        title={managerTitle}
                                                        options={managerOptions}
                                                        value={selectedManagerIds}
                                                        onChange={setSelectedManagerIds}
                                                    />
                                                    :
                                                    <TabSwitcher text1={"Сотрудника"} text2={"Руководителя"}
                                                                 active={activeTab}
                                                                 setActive={setActiveTab}/>
                                                }
                                                <div className={"relative"}>
                                                    <span
                                                        className={"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"}>
                                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21 21L16.65 16.65" stroke="currentColor"
                                                                  strokeWidth="2"
                                                                  strokeLinecap="round"/>
                                                            <circle cx="11" cy="11" r="7" stroke="currentColor"
                                                                    strokeWidth="2"/>
                                                        </svg>
                                                    </span>
                                                    <input
                                                        value={criticalSearch}
                                                        onChange={(e) => setCriticalSearch(e.target.value)}
                                                        placeholder={"Быстрый поиск..."}
                                                        className={"w-[320px] h-[45px] bg-white border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={"border-t border-1 border-gray-300 w-full mb-1"}/>

                                        {/* Table */}
                                        <PersonnelTable
                                            rows={response.content}
                                            activeTab={activeTab}
                                            selectedRows={selectedRows}
                                            selectedManagerIds={selectedManagerIds}
                                            onToggleRow={toggleSelectedRows}
                                            onToggleManager={toggleSelectedManager}
                                        />

                                    </div>
                                </div>

                                {/* See team button */}
                                {((activeTab === 2 && selectedManagerIds.length > 0)) &&
                                    <div className={"flex justify-end mt-3"}>
                                        <button
                                            className={"px-4 py-2 bg-[rgb(49,57,91)] text-white text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-[rgb(40,48,80)]"}
                                            onClick={() => {
                                                setActiveTab(1);
                                                setIsChecking(true);
                                                setAdditionalFilter(false);
                                                setSelectedRows([]);
                                            }}
                                        >
                                            <svg className={"mr-2 inline-block"} width="20" height="16"
                                                 viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M6.875 5.625C7.37228 5.625 7.84919 5.42746 8.20083 5.07583C8.55246 4.72419 8.75 4.24728 8.75 3.75C8.75 3.25272 8.55246 2.77581 8.20083 2.42417C7.84919 2.07254 7.37228 1.875 6.875 1.875C6.37772 1.875 5.90081 2.07254 5.54917 2.42417C5.19754 2.77581 5 3.25272 5 3.75C5 4.24728 5.19754 4.72419 5.54917 5.07583C5.90081 5.42746 6.37772 5.625 6.875 5.625ZM6.875 7.5C7.86956 7.5 8.82339 7.10491 9.52665 6.40165C10.2299 5.69839 10.625 4.74456 10.625 3.75C10.625 2.75544 10.2299 1.80161 9.52665 1.09835C8.82339 0.395088 7.86956 0 6.875 0C5.88044 0 4.92661 0.395088 4.22335 1.09835C3.52009 1.80161 3.125 2.75544 3.125 3.75C3.125 4.74456 3.52009 5.69839 4.22335 6.40165C4.92661 7.10491 5.88044 7.5 6.875 7.5ZM3.08875 11.1075C2.1175 11.7825 1.875 12.4363 1.875 12.74C1.875 13.2975 2.3275 13.75 2.885 13.75H10.865C11.1327 13.7493 11.3892 13.6427 11.5784 13.4534C11.7677 13.2642 11.8743 13.0077 11.875 12.74C11.875 12.435 11.6325 11.7812 10.6613 11.1075C9.74 10.4688 8.39875 10 6.875 10C5.35125 10 4.01 10.4688 3.08875 11.1075ZM0 12.74C0 10.4325 3.09375 8.125 6.875 8.125C8.35 8.125 9.7225 8.47625 10.8463 9.0425C11.9224 8.43417 13.1389 8.11787 14.375 8.125C17.4688 8.125 20 10.0475 20 11.9712C20 12.6088 19.7467 13.2202 19.296 13.671C18.8452 14.1217 18.2338 14.375 17.5962 14.375H13.2425C12.7225 15.13 11.8513 15.625 10.865 15.625H2.885C2.12005 15.6243 1.38663 15.3202 0.845728 14.7793C0.304829 14.2384 0.000662005 13.5049 0 12.74ZM13.7388 12.5H17.5962C17.8888 12.5 18.125 12.2625 18.125 11.9712C18.125 11.8425 18.005 11.3813 17.265 10.8588C16.5725 10.3675 15.5463 10 14.375 10C13.7288 10 13.1263 10.1125 12.6 10.295C13.2575 10.9625 13.6675 11.7275 13.7388 12.5ZM15.625 4.375C15.625 4.70652 15.4933 5.02446 15.2589 5.25888C15.0245 5.4933 14.7065 5.625 14.375 5.625C14.0435 5.625 13.7255 5.4933 13.4911 5.25888C13.2567 5.02446 13.125 4.70652 13.125 4.375C13.125 4.04348 13.2567 3.72554 13.4911 3.49112C13.7255 3.2567 14.0435 3.125 14.375 3.125C14.7065 3.125 15.0245 3.2567 15.2589 3.49112C15.4933 3.72554 15.625 4.04348 15.625 4.375ZM17.5 4.375C17.5 5.2038 17.1708 5.99866 16.5847 6.58471C15.9987 7.17076 15.2038 7.5 14.375 7.5C13.5462 7.5 12.7513 7.17076 12.1653 6.58471C11.5792 5.99866 11.25 5.2038 11.25 4.375C11.25 3.5462 11.5792 2.75134 12.1653 2.16529C12.7513 1.57924 13.5462 1.25 14.375 1.25C15.2038 1.25 15.9987 1.57924 16.5847 2.16529C17.1708 2.75134 17.5 3.5462 17.5 4.375Z"
                                                      fill="#ffffff"/>
                                            </svg>
                                            Посмотреть команду
                                        </button>
                                    </div>
                                }

                                {/* Pagination */}
                                <Pagination
                                    page={response.page}
                                    size={response.size}
                                    totalPages={response.totalPages}
                                    totalElements={response.totalElements}
                                    onPageChange={setPage}
                                />

                                {activeTab === 1 && selectedRows.length > 0 && (
                                    <SelectedEmployeesBar
                                        count={selectedRows.length}
                                        selectedIds={selectedRows}
                                        onPdf={(ids) => console.log("PDF report:", ids)}
                                        onWhatsapp={(ids) => console.log("WhatsApp broadcast:", ids)}
                                        onFeedback={(ids) => console.log("Send feedback:", ids)}
                                    />
                                )}
                            </div>

                            {/* Block 1 */}
                            <div className={"col-span-2 row-span-2 border border-gray-200 rounded-xl bg-white p-5"}>
                                <div className={"flex items-center justify-between"}>
                                    <h2 className={"text-[16px] font-[450] mb-2"}>
                                        {isChecking ? "Сравнение команд" : "Сравнение департамента"}
                                    </h2>
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.27796 12.1299H8.89529V7.27793H7.27796V12.1299ZM8.08662 5.66061C8.08662 5.66061 8.1439 5.66061 8.25846 5.66061C8.37302 5.66061 8.5078 5.58311 8.6628 5.42812C8.81779 5.27312 8.89529 5.08107 8.89529 4.85194C8.89529 4.62282 8.81779 4.43077 8.6628 4.27577C8.5078 4.12078 8.31575 4.04328 8.08662 4.04328C7.8575 4.04328 7.66545 4.12078 7.51045 4.27577C7.35546 4.43077 7.27796 4.62282 7.27796 4.85194C7.27796 5.08107 7.35546 5.27312 7.51045 5.42812C7.66545 5.58311 7.8575 5.66061 8.08662 5.66061ZM8.08662 16.1732C6.96797 16.1732 5.91671 15.9609 4.93284 15.5364C3.94897 15.1118 3.09313 14.5357 2.36534 13.8079C1.63754 13.0801 1.06137 12.2242 0.636822 11.2404C0.212274 10.2565 0 9.20524 0 8.08659C0 6.96794 0.212274 5.91668 0.636822 4.93281C1.06137 3.94894 1.63754 3.0931 2.36534 2.36531C3.09313 1.63751 3.94897 1.06134 4.93284 0.636791C5.91671 0.212244 6.96797 -3.05176e-05 8.08662 -3.05176e-05C9.20527 -3.05176e-05 10.2565 0.212244 11.2404 0.636791C12.2243 1.06134 13.0801 1.63751 13.8079 2.36531C14.5357 3.0931 15.1119 3.94894 15.5364 4.93281C15.961 5.91668 16.1732 6.96794 16.1732 8.08659C16.1732 9.20524 15.961 10.2565 15.5364 11.2404C15.1119 12.2242 14.5357 13.0801 13.8079 13.8079C13.0801 14.5357 12.2243 15.1118 11.2404 15.5364C10.2565 15.9609 9.20527 16.1732 8.08662 16.1732ZM8.08662 14.5559C9.89264 14.5559 11.4224 13.9292 12.6758 12.6758C13.9292 11.4223 14.5559 9.89261 14.5559 8.08659C14.5559 6.28058 13.9292 4.75086 12.6758 3.49743C11.4224 2.24401 9.89264 1.61729 8.08662 1.61729C6.28061 1.61729 4.75089 2.24401 3.49746 3.49743C2.24404 4.75086 1.61732 6.28058 1.61732 8.08659C1.61732 9.89261 2.24404 11.4223 3.49746 12.6758C4.75089 13.9292 6.28061 14.5559 8.08662 14.5559Z" fill="#9CA3AF"/>
                                    </svg>
                                </div>
                                <SpiderChart
                                    variant={isChecking ? "team" : "department"}
                                    selectedLabels={isChecking
                                        ? selectedManagerIds
                                            .map((id) => managerOptions.find((m) => m.id === id)?.label)
                                            .filter((v): v is string => Boolean(v))
                                            .map((name) => `Команда ${name}`)
                                        : selectedDepartments
                                            .map((i) => departments[i]?.label)
                                            .filter((v): v is string => Boolean(v))}
                                />
                            </div>

                            {/* Block 2 */}
                            <div className={"col-span-2 row-span-2 border border-gray-200 rounded-xl bg-white p-5"}>
                                <h2 className={"text-[16px] font-semibold mb-2"}>Отклонение в операциях по добыче полезных ископаемых</h2>
                                <p className={"text-xs text-gray-500"}>Среднесуточное коллективное отклонение.</p>
                                <DivergingBarChart />
                            </div>

                            {/* Block 3 */}
                            <div className={"col-span-2 row-span-1 rounded-xl bg-[rgb(76,91,135)] p-6 text-white flex flex-col justify-between"}>

                                <div className={"flex items-start justify-between"}>
                                    <div className={"h-6 w-6 rounded-lg flex items-center justify-center"}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.23465 11.3213H4.85197V7.27795H3.23465V11.3213ZM9.70395 11.3213H11.3213V3.23464H9.70395V11.3213ZM6.4693 11.3213H8.08662V8.89527H6.4693V11.3213ZM6.4693 7.27795H8.08662V5.66062H6.4693V7.27795ZM1.61732 14.5559C1.17256 14.5559 0.791815 14.3975 0.475089 14.0808C0.158363 13.7641 0 13.3833 0 12.9386V1.61731C0 1.17255 0.158363 0.791801 0.475089 0.475076C0.791815 0.158349 1.17256 -1.33514e-05 1.61732 -1.33514e-05H12.9386C13.3834 -1.33514e-05 13.7641 0.158349 14.0808 0.475076C14.3976 0.791801 14.5559 1.17255 14.5559 1.61731V12.9386C14.5559 13.3833 14.3976 13.7641 14.0808 14.0808C13.7641 14.3975 13.3834 14.5559 12.9386 14.5559H1.61732ZM1.61732 12.9386H12.9386V1.61731H1.61732V12.9386Z" fill="white"/>
                                        </svg>
                                    </div>

                                    <div className={"px-4 py-1.5 rounded-full bg-white/20 text-xs font-semibold tracking-wide"}>
                                        ДЕПАРТАМЕНТ ЗДРАВООХРАНЕНИЯ
                                    </div>
                                </div>

                                <div className={"mt-4"}>
                                    <h2 className={"text-2xl font-bold leading-tight"}>
                                        Стабильный
                                    </h2>
                                    <p className={"mt-3 text-sm text-white/85 leading-relaxed"}>
                                        Добыча полезных ископаемых ведется с задержкой в пределах 5% от
                                        запланированной мощности. Обнаружено 3 аномалии.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Performance;