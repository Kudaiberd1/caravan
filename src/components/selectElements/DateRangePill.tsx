import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import calendar from "../../assets/icons/CalendarBlank.svg";
import {useEffect, useState} from "react";

function fmt(d?: Date) {
    return d ? format(d, "dd.MM.yyyy") : "";
}

type DateRangePillProps = {
    value?: DateRange;
    onChange?: (range?: DateRange) => void;
};

export default function DateRangePill({ value, onChange }: DateRangePillProps) {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>(value);

    useEffect(() => {
        setRange(value);
    }, [value]);

    const label =
        range?.from && range?.to
            ? `${fmt(range.from)} - ${fmt(range.to)}`
            : "Диапазон дат";

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-[15px] text-gray-900 font-[450]"
            >
                {!(range?.from && range?.to) && (
                    <img src={calendar} alt="calendar" className="h-5 w-5 mr-2" />
                )}
                {label}
            </button>

            {open && (
                <div
                    className="absolute z-50 mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <DayPicker
                        mode="range"
                        required={false}
                        selected={range}
                        onSelect={(selectedRange) => {
                            console.log(selectedRange)
                            setRange(selectedRange);
                            onChange?.(selectedRange);

                        }}
                        numberOfMonths={2}
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            className="px-3 py-1 rounded-lg border border-gray-200 text-sm"
                            onClick={() => setOpen(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}