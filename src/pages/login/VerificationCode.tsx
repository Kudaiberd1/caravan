import LoginCard from "../../components/LoginCard.tsx";
import {useNavigate} from "react-router-dom";
import {useMemo, useRef, useState} from "react";

const VerificationCode = () => {
    const navigate = useNavigate();
    const length = 4;

    const [code, setCode] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const isComplete = useMemo(() => code.every((c) => c.length === 1), [code]);

    const setAt = (index: number, value: string) => {
        setCode((prev) => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    };

    const focusAt = (index: number) => {
        const el = inputsRef.current[index];
        if (el) el.focus();
    };

    const handleChange = (index: number, raw: string) => {
        const digits = raw.replace(/\D/g, "");

        if (digits.length > 1) {
            const chars = digits.slice(0, length - index).split("");
            setCode((prev) => {
                const next = [...prev];
                for (let i = 0; i < chars.length; i++) {
                    next[index + i] = chars[i];
                }
                return next;
            });

            const nextFocus = Math.min(index + chars.length, length - 1);
            focusAt(nextFocus);
            return;
        }

        const v = digits.slice(0, 1);
        setAt(index, v);

        if (v && index < length - 1) {
            focusAt(index + 1);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (code[index]) {
                e.preventDefault();
                setAt(index, "");
                return;
            }
            if (index > 0) {
                e.preventDefault();
                focusAt(index - 1);
                setAt(index - 1, "");
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            focusAt(index - 1);
        }
        if (e.key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            focusAt(index + 1);
        }
    };

    const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData("text");
        if (!text) return;
        e.preventDefault();
        handleChange(index, text);
    };

    const handleFocus = (index: number) => {
        const firstEmpty = code.findIndex((c) => !c);
        if (firstEmpty !== -1 && firstEmpty < index) {
            focusAt(firstEmpty);
        }
    };

    return (
        <LoginCard>
            <div className={"flex flex-col items-center text-center mt-[20px]"}>
                <h2 className={"text-xl font-semibold text-white"}>
                    PASSWORD RESET
                </h2>
                <p className={"mt-2 text-sm text-white/50"}>
                    We sent a code to name@caravan-resources.com
                </p>
            </div>

            <form className={"mt-10 space-y-8"}>
                <div className={"flex justify-center gap-4"}>
                    {Array.from({length}).map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            value={code[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={(e) => handlePaste(index, e)}
                            onFocus={() => handleFocus(index)}
                            inputMode={"numeric"}
                            autoComplete={"one-time-code"}
                            maxLength={1}
                            className={
                                "w-16 h-16 text-center text-xl rounded-xl " +
                                "bg-gray-900 border border-white/10 " +
                                "text-white outline-none focus:border-[#5567B1] transition"
                            }
                        />
                    ))}
                </div>

                <button
                    type={"submit"}
                    disabled={!isComplete}
                    className={
                        "w-full rounded-2xl bg-[#5567B1] py-4 font-semibold text-white " +
                        "shadow-[0_14px_30px_rgba(0,0,0,0.25)] disabled:bg-[#8B8B8B] disabled:cursor-not-allowed disabled:opacity-70"
                    }
                    onClick={() => navigate("/reset-password") }
                >
                    Reset password
                </button>

                <button
                    type={"button"}
                    className={"w-full text-sm text-white/50 hover:text-white transition"}
                    onClick={() => navigate("/login") }

                >
                    Back to log in
                </button>
            </form>
        </LoginCard>
    );
}

export default VerificationCode;