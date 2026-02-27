import {useEffect, useState} from "react";
import Sidebar from "../layouts/Sidebar.tsx";
import Navbar from "../layouts/Navbar.tsx";
import downloadIcon from "../assets/icons/downloadIconWhite.svg";
import UserCard from "../components/UserCard.tsx";
import UserStatisticCard from "../components/UserStatisticCard.tsx";
import MonthPicker from "../components/MonthPicker.tsx";
import UserLineChart from "../components/charts/UserLineChart.tsx";
import Footer from "../layouts/Footer.tsx";
import {useNavigate, useParams} from "react-router-dom";
import UserTimeLineChart from "../components/charts/UserTimeLineChart.tsx";
import {mockPersonnel, type PersonnelRow} from "../data.ts";

const SupervisorProfile = () => {

    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<PersonnelRow>();

    const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
    const [isOpen, setIsOpen] = useState(false);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/not-found");
            return;
        }

        const found = mockPersonnel.find((p) => String(p.id) === String(id));
        if (!found) {
            navigate("/not-found");
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPerson(found);
    }, [id, navigate]);

    if (person === undefined) {
        return (
            <div className="p-6">
                <p>User not found!</p>
            </div>
        );
    }

    return (
        <div>
            <Sidebar/>
            <Navbar/>
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)] flex flex-col">
                <div className="flex-1">
                    <div className={"space-y-2 p-[20px]"}>
                        <p className={"text-sm text-gray-500"}>
                            <span className={"cursor-pointer hover:text-gray-600"} onClick={() => navigate("/performance")}> Руководителиы </span> {">"} <span className={"text-black"}> Иванов И. </span>
                        </p>
                        <div className={"flex justify-between"}>
                            <h1 className={"text-2xl font-semibold uppercase"}>профиль руководителя</h1>
                            <div className={"flex gap-3"}>
                                <MonthPicker month={month} setMonth={setMonth} year={year} setYear={setYear} isOpen={isOpen} setIsOpen={setIsOpen} />
                                <button
                                    className={"px-4 py-2 bg-[rgb(49,57,91)] text-white text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-[rgb(40,48,80)]"}
                                >
                                    <img src={downloadIcon} alt="filter" className={"h-3 inline-block mr-2"}/>
                                    Экспорт отчета
                                </button>
                            </div>
                        </div>

                        <div className={"grid grid-cols-3 gap-6 mt-7"}>
                            <UserCard person={person} />
                            <UserStatisticCard />
                        </div>

                        <div className={"border border-gray-500 rounded-2xl mt-5"}>
                            <UserLineChart />
                        </div>

                        <div className={"bg-[rgb(41,46,59)] rounded-xl text-white w-full border border-[rgba(255,255,255,0.06)] mt-5"}>
                            <UserTimeLineChart who={"sup"} />
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default SupervisorProfile;
