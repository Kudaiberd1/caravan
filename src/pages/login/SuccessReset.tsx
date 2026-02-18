import LoginCard from "../../components/LoginCard.tsx";
import {useNavigate} from "react-router-dom";

const SuccessReset = () => {
    const navigate = useNavigate();

    return (
        <LoginCard>
            <div className={"flex flex-col items-center text-center mt-[20px]"}>
                <h2 className={"text-xl font-semibold text-white"}>
                    ALL DONE!
                </h2>
                <p className={"mt-2 text-sm text-white/50"}>
                    Your password has been reset.
                </p>
            </div>
            <button

                type={"submit"}
                className={
                    "mt-4 w-full rounded-2xl bg-[#4F5F93] py-4 font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,0.25)] disabled:bg-[#8B8B8B] disabled:cursor-not-allowed disabled:opacity-70"
                }
                onClick={() => navigate("/login")}
            >
                Back to log in
            </button>
        </LoginCard>
    )
}

export default SuccessReset;