import { useEffect, useRef, useState } from "react";
import notificationIcon from "../assets/icons/notification.svg";
import {useNavigate} from "react-router-dom";
import {getUserDetails, type User} from "../services/getUserDetails.ts";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const [user] = useState<User | null>(() => getUserDetails());

    useEffect(() => {
        const onDocMouseDown = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            const target = e.target as Node;
            if (!wrapperRef.current.contains(target)) setOpen(false);
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", onDocMouseDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onDocMouseDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const handleLogout = () => {
        setOpen(false);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header
            className={
                "fixed top-0 left-[240px] right-0 z-30 h-[64px] " +
                "bg-white border-b border-black/5 " +
                "flex items-center justify-between px-6"
            }
        >
            <div />

            <div className={"flex items-center gap-4"}>
                <select
                    className={
                        "h-9 rounded-md border border-black/10 px-3 text-sm " +
                        "bg-white outline-none focus:border-[#5F6FA3]"
                    }
                >
                    <option>Алматы</option>
                    <option>Алмалы</option>
                    <option>Ашыктас</option>
                    <option>Майкудык</option>
                </select>

                <button className={"text-[#5A667A] hover:text-[#1F2A44] cursor-pointer"}>
                    <img src={notificationIcon} alt={"notifications"} />
                </button>

                <div ref={wrapperRef} className={"relative"}>
                    <button
                        type={"button"}
                        onClick={() => setOpen((v) => !v)}
                        className={
                            "cursor-pointer h-9 w-9 rounded-full bg-[#5F6FA3] text-white " +
                            "flex items-center justify-center text-sm font-medium uppercase"
                        }
                        aria-haspopup="menu"
                        aria-expanded={open}
                    >
                        {user?.firstName[0]}{user?.lastName[0]}
                    </button>

                    {open && (
                        <div
                            role="menu"
                            className={
                                "absolute right-0 mt-2 w-[180px] rounded-xl bg-white " +
                                "border border-black/10 shadow-lg overflow-hidden"
                            }
                        >
                            <button
                                type={"button"}
                                role="menuitem"
                                onClick={handleLogout}
                                className={
                                    "w-full text-left px-4 py-3 text-sm text-[#1F2A44] " +
                                    "hover:bg-gray-50"
                                }
                            >
                                Выйти
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;