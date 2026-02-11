import LoginCard from "../layouts/LoginCard.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const isValid = password.length >= 8 && password === confirm;

    return (
        <LoginCard>
            <div className={"flex flex-col items-center text-center mt-[20px]"}>
                <h2 className={"text-xl font-semibold text-white"}>
                    SET NEW PASSWORD
                </h2>
                <p className={"mt-2 text-sm text-white/50"}>
                    Must be at least 8 characters.
                </p>
            </div>

            <form className={"mt-10 space-y-6"}>
                <div>
                    <p className={"text-xs font-semibold tracking-widest text-white/55 mb-2 text-left"}>
                        PASSWORD
                    </p>
                    <div className={"flex items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 py-3.5"}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={"text-white/45"}>
                            <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M12 15v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>

                        <input
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={"w-full bg-transparent outline-none text-white/80 placeholder:text-white/25"}
                            placeholder={"••••••••"}
                        />
                    </div>
                </div>

                <div>
                    <p className={"text-xs font-semibold tracking-widest text-white/55 mb-2 text-left"}>
                        CONFIRM PASSWORD
                    </p>
                    <div className={"flex items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 py-3.5"}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={"text-white/45"}>
                            <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M12 15v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>

                        <input
                            type={"password"}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className={"w-full bg-transparent outline-none text-white/80 placeholder:text-white/25"}
                            placeholder={"••••••••"}
                        />
                    </div>
                </div>

                <button
                    type={"submit"}
                    disabled={!isValid}
                    className={
                        "w-full rounded-2xl bg-[#4F5F93] py-4 font-semibold text-white " +
                        "shadow-[0_14px_30px_rgba(0,0,0,0.25)] disabled:bg-[#8B8B8B] disabled:cursor-not-allowed disabled:opacity-70"
                    }
                    onClick={() => navigate("/success-reset")}
                >
                    Reset password
                </button>

                <button
                    type={"button"}
                    className={"w-full text-sm text-white/50 hover:text-white transition"}
                    onClick={() => navigate("/login")}
                >
                    Back to log in
                </button>
            </form>
        </LoginCard>
    )
}

export default ResetPassword;