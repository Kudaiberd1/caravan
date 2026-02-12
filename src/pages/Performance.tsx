import Sidebar from "../layouts/Sidebar.tsx";
import Navbar from "../layouts/Navbar.tsx";

const Performance = () => {
    return (
        <div>
            <Sidebar />
            <Navbar />
            <div>
                <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)]">
                    <h1 className={"text-3xl font-bold text-center pt-10"}>Performance</h1>
                </div>
            </div>
        </div>
    )
}

export default Performance;