import notificationIcon from "../assets/icons/notification.svg";

const Navbar = () => {
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
                    <option>Almaty</option>
                    <option>Astana</option>
                    <option>Ashyqtas</option>
                    <option>Maiqudyq</option>
                </select>

                <button className={"text-[#5A667A] hover:text-[#1F2A44] cursor-pointer"}>
                    <img src={notificationIcon} />
                </button>

                <div
                    className={
                        "h-9 w-9 rounded-full bg-[#5F6FA3] text-white " +
                        "flex items-center justify-center text-sm font-medium"
                    }
                >
                    AD
                </div>
            </div>
        </header>
    );
};

export default Navbar;