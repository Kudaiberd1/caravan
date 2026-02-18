import Sidebar from "../layouts/Sidebar.tsx";
import Navbar from "../layouts/Navbar.tsx";
import docIcon from "../assets/icons/docIcon.svg"
import statIcon from "../assets/icons/statIcon.svg"
import alertIcon from "../assets/icons/alert.svg"
import groupIcon from "../assets/icons/groupIcon.svg"
import usersIcon from "../assets/icons/Users.svg"
import {useState} from "react";
import DepartmentCard from "../components/DepartmentCard.tsx";
import {DensityLegend} from "../components/DensityLegend.tsx";

export type DepartmentStaffing = {
    id: string;
    name: string;
    current: number;
    target: number;
};

// eslint-disable-next-line react-refresh/only-export-components
export const mockDepartments: DepartmentStaffing[] = [
    { id: "gen-dir", name: "Генеральная дирекция", current: 1, target: 1 },
    { id: "geo", name: "Геологический департамент", current: 1, target: 1 },
    { id: "internal-control", name: "Департамент внутреннего контроля", current: 1, target: 1 },
    { id: "mining", name: "Департамент горного производства", current: 185, target: 210 },
    { id: "it", name: "Департамент информационных технологий", current: 2, target: 3 },
    { id: "heap-leaching", name: "Департамент кучного выщелачивания", current: 28, target: 80 },
    { id: "logistics", name: "Департамент логистики", current: 68, target: 80 },
    { id: "mto", name: "Департамент материально-технического обеспечения", current: 27, target: 30 },
    { id: "hr-social", name: "Департамент по персоналу и социальным вопросам", current: 3, target: 4 },

    { id: "pm", name: "Департамент проектного управления", current: 2, target: 2 },
    { id: "production-support", name: "Департамент производственного обеспечения", current: 157, target: 175 },
    { id: "hse", name: "Департамент промышленной безопасности, охраны труда и окружающей среды", current: 13, target: 15 },
    { id: "ore-prep", name: "Департамент рудоподготовки", current: 59, target: 80 },
    { id: "construction", name: "Департамент строительства", current: 1, target: 1 },
    { id: "metallurgy", name: "Металлургический департамент", current: 46, target: 52 },
    { id: "security", name: "Охранная компания", current: 15, target: 18 },
    { id: "tech", name: "Технологический департамент", current: 33, target: 38 },
    { id: "finance", name: "Финансовый департамент", current: 2, target: 2 },
];

const Dashboard = () => {

    const [active, setActive] = useState<"real" | "graphic">("real");

    return (
        <div>
            <Sidebar />
            <Navbar />
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)]">
                <div className={"flex justify-between px-[20px] py-[20px]"}>
                    <div className={"space-y-2"}>
                        <h1 className={"text-3xl font-semibold"}>Оперативная операция</h1>
                        <p className={"text-sm text-gray-500"}> Глобальная производительность сайта и плотность критически важного персонала </p>
                    </div>
                    <button className={"px-4 py-2 bg-[rgb(49,57,91)] text-white text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-[rgb(40,48,80)]"}>
                        <img src={docIcon} className={"inline-block mr-2"} />
                        Исполнительный отчет
                    </button>
                </div>

                <div className={"flex mt-[20px] gap-6 px-[20px] w-full"}>
                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex justify-between items-start mb-[18px]"}>
                            <div className={"space-y-[7px]"}>
                                <p className={"text-gray-500 font-semibold text-sm"}> Соблюдение графика смен </p>
                                <h1 className={"text-[28px] font-bold"}> 98.5% </h1>
                                <p className={"text-gray-500 text-[12px]"}> Совокупная производительность площадки </p>
                            </div>
                            <img src={statIcon} className={"w-[50px]"} alt={"statistic_icon"} />
                        </div>
                        <div style={{background: `linear-gradient(to right, #4F5F93 ${98.5}%, #E5E7EB ${98.5}%)`}} className="h-2 w-full rounded-full mb-[34px]" />
                    </div>

                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex justify-between items-start mb-[15px]"}>
                            <div className={"space-y-[7px]"}>
                                <p className={"text-gray-500 font-semibold text-sm"}> Критические отклонения </p>
                                <h1 className={"text-[28px] font-bold"}> 14 <span className={"text-gray-500 text-[15px] font-normal"}> Оповещений </span> </h1>
                                <p className={"text-gray-500 text-[12px]"}>
                                    Разница во времени между сменами {">"} 2 часов
                                </p>
                            </div>
                            <img src={alertIcon} className={"w-[50px]"} alt={"statistic_icon"} />
                        </div>
                    </div>

                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex justify-between items-start mb-[18px]"}>
                            <div className={"space-y-[7px]"}>
                                <p className={"text-gray-500 font-semibold text-sm"}> На Локации сейчас </p>
                                <h1 className={"text-[28px] font-bold"}> 428 </h1>
                                <p className={"text-gray-500 text-[12px]"}> Распределено по 5 зонам </p>
                            </div>
                            <img src={groupIcon} className={"w-[50px]"} alt={"statistic_icon"} />
                        </div>
                    </div>

                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex items-start justify-between mb-4"}>
                            <p className={"text-gray-500 font-semibold text-sm"}>
                                Нарушения по отделам
                            </p>

                            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6448 17.9526V16.497H13.5371L9.75256 12.7489L6.84138 15.6601L1.45569 10.238L2.4746 9.21908L6.84138 13.5859L9.75256 10.6747L14.556 15.4781V13.5859H16.0116V17.9526H11.6448Z" fill="#EF4444"/>
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

                <div className={"flex mt-[20px] gap-6 px-[20px] w-full"}>
                    <div className={"bg-white border-[2px] border-gray-200 rounded-xl px-[20px] w-full"}>
                        <div className={"flex justify-between pt-[20px] items-center"}>
                            <div className={"flex gap-2"}>
                                <span className={"py-auto"}>
                                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.4847 22.0763L8.82403 20.0951L4.43703 21.7933C4.12255 21.9191 3.83166 21.8837 3.56435 21.6872C3.29705 21.4906 3.16339 21.2272 3.16339 20.897V7.68888C3.16339 7.48446 3.22236 7.30364 3.34029 7.1464C3.45822 6.98916 3.61939 6.87123 3.8238 6.79261L8.82403 5.09442L14.4847 7.07564L18.8717 5.37745C19.1861 5.25166 19.477 5.28704 19.7443 5.48359C20.0116 5.68014 20.1453 5.94351 20.1453 6.27372V19.4819C20.1453 19.6863 20.0863 19.8671 19.9684 20.0243C19.8505 20.1816 19.6893 20.2995 19.4849 20.3781L14.4847 22.0763ZM13.5412 19.7649V8.72666L9.76747 7.40584V18.4441L13.5412 19.7649ZM15.4281 19.7649L18.2584 18.8215V7.6417L15.4281 8.72666V19.7649ZM5.05027 19.529L7.88059 18.4441V7.40584L5.05027 8.34928V19.529Z" fill="#475784"/>
                                    </svg>
                                </span>
                                <p className={"font-semibold text-lg"}> Тепловая карта департаментов в реальном времени </p>
                            </div>
                            <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200 my-auto">
                                <button
                                    onClick={() => setActive("real")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active === "real"
                                            ? "bg-white shadow text-[#1F2A44]"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    В реальном времени
                                </button>

                                <button
                                    onClick={() => setActive("graphic")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active === "graphic"
                                            ? "bg-white shadow text-[#1F2A44]"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Графика
                                </button>
                            </div>
                        </div>
                        <div className={"flex items-center gap-3 mb-3"}>
                            <p className={"text-xl font-semibold text-[#475784]"}> Алмалы - 480  </p>
                            <img src={usersIcon} className={"h-4"} />
                        </div>

                        <div className={"py-[20px] border border-dashed border-gray-300 rounded-lg mb-[20px] bg-gray-50 grid grid-cols-2 gap-3 p-4"}>
                            {mockDepartments.map((dept) =>
                                <DepartmentCard key={dept.id} staffing={dept} />
                            )}
                            <DensityLegend />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;