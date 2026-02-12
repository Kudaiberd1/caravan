import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../../layouts/LoginCard.tsx";

const Login = () => {
    const [hasError, setHasError] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setHasError(true);
            return;
        }
        setHasError(false);
        // ...
    }

    return (
        <LoginCard>
            <div>
                <div className={"mt-10"}>
                    <form onSubmit={handleSubmit} className={"space-y-6"}>
                        <div>
                            <p className={"text-xs font-semibold tracking-widest text-white/60 mb-2"}>EMAIL OR USERNAME</p>
                            <div
                                className={
                                    "flex items-center gap-3 rounded-xl border bg-black/15 px-4 py-3.5 transition " +
                                    (hasError ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-white/10")
                                }
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={"text-white/45"}>
                                    <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <input
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (hasError) setHasError(false);
                                    }}
                                    className={"w-full bg-transparent outline-none text-white/80 placeholder:text-white/25"}
                                    placeholder={"name@caravan-resources.com"}
                                />
                            </div>
                        </div>

                        <div>
                            <p className={"text-xs font-semibold tracking-widest text-white/60 mb-2"}>PASSWORD</p>
                            <div
                                className={
                                    "flex items-center gap-3 rounded-xl border bg-black/15 px-4 py-3.5 transition " +
                                    (hasError ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-white/10")
                                }
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={"text-white/45"}>
                                    <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                                    <path d="M12 15v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <input
                                    type={"password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (hasError) setHasError(false);
                                    }}
                                    className={"w-full bg-transparent outline-none text-white/80 placeholder:text-white/25"}
                                    placeholder={"••••••••"}
                                />
                            </div>
                        </div>

                        <div className={"flex items-center justify-between pt-1"}>
                            <label className={"flex items-center gap-3 text-sm text-white/60"}>
                                <input
                                    type={"checkbox"}
                                    className={"h-4 w-4 rounded-full border border-white/30 bg-transparent accent-[#5567B1]"}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>

                            <button type={"button"} className={"text-sm font-medium text-[#6C86FF] hover:text-[#8FA2FF]"} onClick={() => navigate("/forgot-password")}>
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type={"submit"}
                            className={"w-full rounded-2xl bg-[#5567B1] py-4 font-semibold text-white shadow-[0_14px_30px_rgba(85,103,177,0.35)] hover:bg-[#5E72C7] transition"}
                            onClick={() => navigate("/")}
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

                    <p className={"mt-3 text-xs leading-5 text-white/60"}>
                        Access is restricted to authorized personnel. All sessions are logged for security and compliance monitoring.
                    </p>
                </div>
            </div>
        </LoginCard>
    );
}

export default Login;