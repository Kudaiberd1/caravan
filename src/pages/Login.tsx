import logo from "../assets/logo.svg";

const Login = () => {
    return (
        <div className={"min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#021C3A] px-4 py-10"}>
            <div className={"absolute inset-0 bg-[radial-gradient(circle_at_0%_80%,rgba(124,58,237,0.40),transparent_55%)]"} />
            <div className={"absolute inset-0 bg-[radial-gradient(circle_at_30%_95%,rgba(99,102,241,0.22),transparent_60%)]"} />
            <div className={"absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_55%)]"} />

            <div className={"relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-[#141822]/70 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.55)] overflow-hidden"}>
                <div className={"p-8 sm:p-10"}>

                    <div className={"flex flex-col items-center text-center"}>
                        <img src={logo} className={"w-28 h-auto"} />
                        <p className={"mt-4 text-sm font-semibold tracking-widest text-[#5F6FA3]"}>CARAVAN RESOURCES</p>
                        <h1 className={"mt-3 text-lg font-semibold tracking-[0.35em] text-white/70"}>ANALYTICS PLATFORM</h1>
                    </div>

                    <div className={"mt-10"}>
                        <form className={"space-y-6"}>
                            <div>
                                <p className={"text-xs font-semibold tracking-widest text-white/55 mb-2"}>EMAIL OR USERNAME</p>
                                <div className={"flex items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 py-3.5"}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={"text-white/45"}>
                                        <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <input
                                        className={"w-full bg-transparent outline-none text-white/80 placeholder:text-white/25"}
                                        placeholder={"name@caravan-resources.com"}
                                    />
                                </div>
                            </div>

                            <div>
                                <p className={"text-xs font-semibold tracking-widest text-white/55 mb-2"}>PASSWORD</p>
                                <div className={"flex items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 py-3.5"}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={"text-white/45"}>
                                        <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M12 15v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <input
                                        type={"password"}
                                        className={"w-full bg-transparent outline-none text-white/80 placeholder:text-white/25"}
                                        placeholder={"••••••••"}
                                    />
                                </div>
                            </div>

                            <div className={"flex items-center justify-between pt-1"}>
                                <label className={"flex items-center gap-3 text-sm text-white/55"}>
                                    <input
                                        type={"checkbox"}
                                        className={"h-4 w-4 rounded-full border border-white/30 bg-transparent accent-[#5567B1]"}
                                    />
                                    Remember me
                                </label>

                                <button type={"button"} className={"text-sm font-medium text-[#6C86FF] hover:text-[#8FA2FF]"}>
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type={"submit"}
                                className={"w-full rounded-2xl bg-[#5567B1] py-4 font-semibold text-white shadow-[0_14px_30px_rgba(85,103,177,0.35)] hover:bg-[#5E72C7] transition"}
                            >
                                Sign in to Dashboard
                            </button>
                        </form>
                    </div>

                    <div className={"mt-10 border-t border-white/10"} />

                    <div className={"mt-8 pb-2 text-center"}>
                        <div className={"inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#7C3AED]"}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2 20 6v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M9.5 12.5 11 14l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            SECURE ACCESS
                        </div>

                        <p className={"mt-3 text-xs leading-5 text-white/35"}>
                            Access is restricted to authorized personnel. All sessions are logged for security and compliance monitoring.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;