import {type Dispatch, type SetStateAction, useEffect, useMemo } from "react";

interface Props {
    month: string;
    setMonth: Dispatch<SetStateAction<string>>;
    year: number;
    setYear: Dispatch<SetStateAction<number>>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MonthPicker = ({ month, setMonth, year, setYear, isOpen, setIsOpen } : Props) => {

    useEffect(() => {
        const [y] = month.split("-").map(Number);
        if (y) setYear(y);
    }, [month]);

    const monthLabel = useMemo(() => {
        const [y, m] = month.split("-").map(Number);
        if (!y || !m) return "";
        const d = new Date(Date.UTC(y, m - 1, 1));
        const formatted = new Intl.DateTimeFormat("ru-RU", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        }).format(d);
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }, [month]);

    const monthsRu = useMemo(
        () => [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        []
    );

    const selectMonth = (mIndex: number) => {
        const mm = String(mIndex + 1).padStart(2, "0");
        setMonth(`${year}-${mm}`);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((p) => !p)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm rounded-lg shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-600"
                >
                    <path
                        d="M7 2v2M17 2v2M3.5 9h17M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="text-gray-800">{monthLabel}</span>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50 w-[320px]">
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={() => setYear((y) => y - 1)}
                            className="h-8 w-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"
                            aria-label="prev year"
                        >
                            ‹
                        </button>

                        <div className="text-sm font-semibold text-gray-900">{year}</div>

                        <button
                            type="button"
                            onClick={() => setYear((y) => y + 1)}
                            className="h-8 w-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"
                            aria-label="next year"
                        >
                            ›
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {monthsRu.map((label, idx) => {
                            const mm = String(idx + 1).padStart(2, "0");
                            const isSelected = month === `${year}-${mm}`;
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => selectMonth(idx)}
                                    className={
                                        "px-2 py-2 rounded-lg text-xs border transition-all duration-150 cursor-pointer " +
                                        (isSelected
                                            ? "bg-[rgb(49,57,91)] text-white border-[rgb(49,57,91)]"
                                            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50")
                                    }
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MonthPicker;