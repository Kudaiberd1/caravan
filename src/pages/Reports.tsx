import Sidebar from "../layouts/Sidebar.tsx";
import Navbar from "../layouts/Navbar.tsx";
import Footer from "../layouts/Footer.tsx";

const Reports = () => {
    return (
        <div>
            <Sidebar/>
            <Navbar/>
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)] flex flex-col">
                <div className="flex-1">
                    <div className={"space-y-2 p-[20px]"}>
                        <h1 className={"text-3xl font-semibold"}>Отчеты</h1>
                        <p className={"text-sm text-gray-500"}> Объявления о техническом обслуживании системы </p>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Reports;