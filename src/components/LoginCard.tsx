import logo from "../assets/logo.svg";
import {useEffect, useState} from "react";
import api from "../api/axiosInstance.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const LoginCard = ({children}) => {

    const [connected, setConnected] = useState(false);

    useEffect(() => {
        api.get("/auth/connection").then(() => setConnected(true)).catch(() => setConnected(false));
    }, []);

    return (
        <div className={"min-h-screen w-full flex md:items-center md:justify-center relative overflow-hidden bg-[#021C3A] md:px-4 md:py-10"}>
            <div className={"absolute inset-0 bg-[radial-gradient(circle_at_0%_80%,rgba(124,58,237,0.40),transparent_55%)]"} />
            <div className={"absolute inset-0 bg-[radial-gradient(circle_at_30%_95%,rgba(99,102,241,0.22),transparent_60%)]"} />
            <div className={"absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_55%)]"} />

            <div className={"hidden md:block absolute bottom-6 right-6 z-20"}>
                <div className={
                    "flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-md border shadow-lg " +
                    (connected
                        ? "bg-[#0E1A2B]/80 border-white/10"
                        : "bg-red-900/40 border-red-500/30")
                }>
                    <span className={"relative flex h-3 w-3"}>
                        {connected && (
                            <span className={"animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"}></span>
                        )}
                        <span
                            className={
                                "relative inline-flex rounded-full h-3 w-3 " +
                                (connected ? "bg-green-500" : "bg-red-500")
                            }
                        ></span>
                    </span>
                    <span
                        className={
                            "text-sm font-medium tracking-wide " +
                            (connected ? "text-green-400" : "text-red-400")
                        }
                    >
                        {connected ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}
                    </span>
                </div>
            </div>

            <div className={"relative z-10 w-full max-w-lg md:rounded-[28px] border border-white/10 bg-[#141822]/70 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.55)] overflow-hidden"}>
                <div className={"p-8 sm:p-10"}>

                    <div className={"flex flex-col items-center text-center"}>
                        <img src={logo} className={"w-80"} />
                        <h1 className={"mt-3 text-lg font-semibold tracking-[0.25em] text-white/80"}>ANALYTICS PLATFORM</h1>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LoginCard;