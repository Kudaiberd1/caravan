import LoginCard from "../../components/LoginCard.tsx";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <LoginCard>
            <div className={"flex flex-col items-center text-center"}>
                <div className={"mb-6"}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className={"mx-auto text-white/70"}>
                        <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M12 15v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>

                <h2 className={"text-xl font-semibold text-white"}>
                    FORGOT PASSWORD?
                </h2>
                <p className={"mt-2 text-sm text-white/50"}>
                    No worries, we’ll send you reset password
                </p>
            </div>

            <form className={"mt-10 space-y-6"}>
                <div>
                    <p className={"text-xs font-semibold tracking-widest text-white/55 mb-2 text-left"}>
                        EMAIL OR USERNAME
                    </p>

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

                <button
                    type={"submit"}
                    className={"w-full rounded-2xl bg-[#5567B1] py-4 font-semibold text-white shadow-[0_14px_30px_rgba(85,103,177,0.35)] hover:bg-[#5E72C7] transition"}
                    onClick={() => navigate("/verification-code") }
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

export default ForgotPassword;