import Sidebar from "../layouts/Sidebar.tsx";
import Navbar from "../layouts/Navbar.tsx";
import docIcon from "../assets/icons/docIcon.svg"
import statIcon from "../assets/icons/statIcon.svg"
import alertIcon from "../assets/icons/alert.svg"
import groupIcon from "../assets/icons/groupIcon.svg"

const Dashboard = () => {
    return (
        <div>
            <Sidebar />
            <Navbar />
            <div className="ml-[240px] pt-[64px] min-h-screen bg-[rgb(241,242,245)]">
                <div className={"flex justify-between px-[20px] py-[20px]"}>
                    <div className={"space-y-2"}>
                        <h1 className={"text-3xl font-semibold"}>Executive Oversight</h1>
                        <p className={"text-sm text-gray-500"}> Global site performance and critical personnel density </p>
                    </div>
                    <button className={"px-4 py-2 bg-[rgb(49,57,91)] text-white text-sm rounded-lg my-auto transition-all duration-200 hover:scale-101 hover:shadow-lg hover:bg-[rgb(40,48,80)]"}>
                        <img src={docIcon} className={"inline-block mr-2"} />
                        Executive Report
                    </button>
                </div>

                <div className={"flex my-[20px] gap-6 px-[20px] w-full"}>
                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex justify-between items-start mb-[18px]"}>
                            <div className={"space-y-[7px]"}>
                                <p className={"text-gray-500 font-semibold text-sm"}> SHIFT COMPLIANCE </p>
                                <h1 className={"text-[28px] font-bold"}> 98.5% </h1>
                                <p className={"text-gray-500 text-[12px]"}> Aggregated site productivity </p>
                            </div>
                            <img src={statIcon} className={"w-[50px]"} alt={"statistic_icon"} />
                        </div>
                        <div style={{background: `linear-gradient(to right, #4F5F93 ${98.5}%, #E5E7EB ${98.5}%)`}} className="h-2 w-full rounded-full mb-[34px]" />
                    </div>

                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex justify-between items-start mb-[15px]"}>
                            <div className={"space-y-[7px]"}>
                                <p className={"text-gray-500 font-semibold text-sm"}> CRITICAL DEVIATIONS </p>
                                <h1 className={"text-[28px] font-bold"}> 14 <span className={"text-gray-500 text-[15px] font-normal"}> Alerts </span> </h1>
                                <p className={"text-gray-500 text-[12px]"}>
                                    Shift discrepancy {">"} 2 hours
                                </p>
                            </div>
                            <img src={alertIcon} className={"w-[50px]"} alt={"statistic_icon"} />
                        </div>
                        <p className={"flex text-red-500 text-sm"}>
                            <span className={"pr-1 my-auto"}>
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.16643 10.998L1.41168 10.2433L5.40108 6.22694L7.55752 8.38337L10.3609 5.60697H8.9592V4.52875H12.1938V7.7634H11.1156V6.36172L7.55752 9.91983L5.40108 7.7634L2.16643 10.998Z" fill="#DC2626"/>
                                </svg>
                            </span>
                            Up from 8 yesterday
                        </p>
                    </div>

                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex justify-between items-start mb-[18px]"}>
                            <div className={"space-y-[7px]"}>
                                <p className={"text-gray-500 font-semibold text-sm"}> ON SITE NOW </p>
                                <h1 className={"text-[28px] font-bold"}> 428 </h1>
                                <p className={"text-gray-500 text-[12px]"}> Distributed across 5 zones </p>
                            </div>
                            <img src={groupIcon} className={"w-[50px]"} alt={"statistic_icon"} />
                        </div>
                        <p className={"flex text-gray-500 text-sm"}>
                            <span className={"pr-1 my-auto"}>
                                <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.26384 12.3997H7.34206V9.16502H6.26384V12.3997ZM6.80295 8.08681C6.80295 8.08681 6.84113 8.08681 6.91751 8.08681C6.99388 8.08681 7.08373 8.03514 7.18706 7.93181C7.29039 7.82849 7.34206 7.70045 7.34206 7.5477C7.34206 7.39495 7.29039 7.26691 7.18706 7.16359C7.08373 7.06026 6.95569 7.00859 6.80295 7.00859C6.6502 7.00859 6.52216 7.06026 6.41883 7.16359C6.3155 7.26691 6.26384 7.39495 6.26384 7.5477C6.26384 7.70045 6.3155 7.82849 6.41883 7.93181C6.52216 8.03514 6.6502 8.08681 6.80295 8.08681ZM6.80295 15.0952C6.05718 15.0952 5.35634 14.9537 4.70043 14.6707C4.04451 14.3876 3.47395 14.0035 2.98876 13.5183C2.50356 13.0331 2.11944 12.4626 1.83641 11.8067C1.55338 11.1507 1.41187 10.4499 1.41187 9.70413C1.41187 8.95837 1.55338 8.25753 1.83641 7.60161C2.11944 6.9457 2.50356 6.37514 2.98876 5.88994C3.47395 5.40475 4.04451 5.02063 4.70043 4.7376C5.35634 4.45457 6.05718 4.31305 6.80295 4.31305C7.54871 4.31305 8.24955 4.45457 8.90547 4.7376C9.56138 5.02063 10.1319 5.40475 10.6171 5.88994C11.1023 6.37514 11.4865 6.9457 11.7695 7.60161C12.0525 8.25753 12.194 8.95837 12.194 9.70413C12.194 10.4499 12.0525 11.1507 11.7695 11.8067C11.4865 12.4626 11.1023 13.0331 10.6171 13.5183C10.1319 14.0035 9.56138 14.3876 8.90547 14.6707C8.24955 14.9537 7.54871 15.0952 6.80295 15.0952ZM6.80295 14.017C8.00696 14.017 9.02677 13.5992 9.86239 12.7636C10.698 11.928 11.1158 10.9081 11.1158 9.70413C11.1158 8.50012 10.698 7.48031 9.86239 6.64469C9.02677 5.80908 8.00696 5.39127 6.80295 5.39127C5.59894 5.39127 4.57913 5.80908 3.74351 6.64469C2.90789 7.48031 2.49008 8.50012 2.49008 9.70413C2.49008 10.9081 2.90789 11.928 3.74351 12.7636C4.57913 13.5992 5.59894 14.017 6.80295 14.017Z" fill="#6B7280"/>
                                </svg>
                            </span>
                            12 visitor excepted today
                        </p>
                    </div>

                    <div className={"border-[2px] border-gray-200 rounded-xl px-[20px] pt-[20px] bg-white w-full"}>
                        <div className={"flex items-start justify-between mb-4"}>
                            <p className={"text-gray-500 font-semibold text-sm"}>
                                WORST DEPT COMPLIANCE
                            </p>

                            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6448 17.9526V16.497H13.5371L9.75256 12.7489L6.84138 15.6601L1.45569 10.238L2.4746 9.21908L6.84138 13.5859L9.75256 10.6747L14.556 15.4781V13.5859H16.0116V17.9526H11.6448Z" fill="#EF4444"/>
                            </svg>

                        </div>

                        <div className={"space-y-3 pb-6"}>
                            <div className={"flex items-center justify-between text-sm"}>
                                <span className={"text-[#1F2A44]"}>Exploration</span>
                                <span className={"font-semibold text-red-500"}>82.1%</span>
                            </div>

                            <div className={"flex items-center justify-between text-sm"}>
                                <span className={"text-[#1F2A44]"}>Logistics</span>
                                <span className={"font-semibold text-red-500"}>85.4%</span>
                            </div>

                            <div className={"flex items-center justify-between text-sm"}>
                                <span className={"text-[#1F2A44]"}>Maintenance</span>
                                <span className={"font-semibold text-amber-500"}>89.9%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;