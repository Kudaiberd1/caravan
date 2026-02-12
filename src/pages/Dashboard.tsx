import Sidebar from "../layouts/Sidebar.tsx";
import Navbar from "../layouts/Navbar.tsx";

const Dashboard = () => {
    return (
        <div>
            <Sidebar />
            <Navbar />
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)]">
                <h1 className={"text-3xl font-bold text-center pt-10"}>Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard;