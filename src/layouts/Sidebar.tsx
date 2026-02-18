import {NavLink} from "react-router-dom";
import logo from "../assets/logo.svg";
import calendarIcon from "../assets/icons/CalendarBlank.svg";
import folderIcon from "../assets/icons/FolderNotchOpen.svg";
import homeIcon from "../assets/icons/HouseLine.svg";

const navItems = [
    {to: "/", label: "Главная Панель", icon: "home"},
    {to: "/performance", label: "Сотрудники", icon: "calendar"},
    {to: "/reports", label: "Отчеты", icon: "folder"},
] as const;

const Icon = ({name}: {name: "home" | "calendar" | "folder"}) => {
    switch (name) {
        case "home":
            return (
                <img src={homeIcon} className={"w-[22px] h-[22px]"}/>
            );
        case "calendar":
            return (
                <img src={calendarIcon} className={"w-[22px] h-[22px]"}/>
            );
        case "folder":
            return (
                <img src={folderIcon} className={"w-[22px] h-[22px]"}/>
            );
    }
};

const Sidebar = () => {
    return (
        <aside
            className={
                "fixed left-0 top-0 z-40 h-screen w-[240px] " +
                "bg-white"
            }
        >
            <div className={"px-6 pt-6 pb-4"}>
                <div className={"flex items-center justify-center"}>
                    <img src={logo} alt={"Caravan Resources"} className={"w-[320px] h-auto"} />
                </div>
            </div>

            <nav className={"pt-2"}>
                <ul className={"space-y-1"}>
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({isActive}) =>
                                    "pl-5 group flex items-center gap-3 px-4 py-3 text-sm transition " +
                                    (isActive
                                        ? "bg-[#EEF3FF] text-[#1F2A44] font-medium relative"
                                        : "text-[#5A667A] hover:bg-black/5")
                                }
                            >
                                {({isActive}) => (
                                    <>
                                        <Icon name={item.icon} />
                                        <span>{item.label}</span>

                                        {isActive && (
                                            <span className={"absolute right-0 top-0 bottom-0 w-[3px] bg-[#5F6FA3]"} />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;