import * as React from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { addDays, format } from "date-fns";

function fmt(d?: Date) {
    return d ? format(d, "dd.MM.yyyy") : "";
}

function toWeekRange(from: Date): DateRange {
    return { from, to: addDays(from, 7) };
}

export default function DateRangePillForWeek() {
    const [open, setOpen] = React.useState(false);
    const [range, setRange] = React.useState<DateRange | undefined>(
        toWeekRange(new Date(2026, 1, 1))
    );

    const label =
        range?.from && range?.to
            ? `${fmt(range.from)} - ${fmt(range.to)}`
            : "Выберите даты";

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="
          inline-flex items-center
          px-3 py-1
          rounded-full
          border border-gray-200
          bg-white
          text-sm text-gray-900
          shadow-sm
        "
            >
                {label}
            </button>

            {open && (
                <div
                    className="absolute z-50 mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <DayPicker
                        mode="range"
                        selected={range}
                        onDayClick={(day) => {
                            setRange(toWeekRange(day));
                        }}
                        numberOfMonths={2}
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <button
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