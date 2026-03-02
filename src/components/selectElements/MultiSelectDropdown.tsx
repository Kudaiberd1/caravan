import * as React from "react";

type Option = { id: string; label: string };

type Props = {
    title?: string;
    options: Option[];
    value: string[];
    onChange: (next: string[]) => void;
};

export default function MultiSelectDropdown({
                                                title = "Департаменты",
                                                options,
                                                value,
                                                onChange,
                                            }: Props) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        }

        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const toggle = (id: string) => {
        const next = value.includes(id) ? value.filter((x) => x !== id) : [...value, id];
        onChange(next);
    };

    const selectedCount = value.length;
    const buttonLabel = selectedCount ? `${title}` : title;

    return (
        <div ref={ref} className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="
          inline-flex items-center justify-between gap-3
          px-4 py-2 rounded-xl
          bg-white border border-gray-200
          text-sm text-gray-900 shadow-sm
          min-w-[220px]
        "
            >
                <span className="truncate">{buttonLabel}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
                    <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
            </button>

            {open && (
                <div
                    className="
            absolute left-0 mt-2 z-50
            w-[320px]
            rounded-2xl
            bg-white border border-gray-200
            shadow-xl
          "
                >
                    <div className="max-h-[320px] overflow-auto p-3">
                        {options.map((opt) => {
                            const checked = value.includes(opt.id);
                            return (
                                <label
                                    key={opt.id}
                                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <span
                                        className={[
                                            "h-5 w-5 rounded border flex items-center justify-center",
                                            checked ? "bg-slate-600 border-slate-600" : "bg-white border-gray-300",
                                        ].join(" ")}
                                        aria-hidden
                                    >
                    {checked && (
                        <svg width="14" height="14" viewBox="0 0 24 24">
                            <path
                                d="M20 6L9 17l-5-5"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                  </span>

                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggle(opt.id)}
                                        className="hidden"
                                    />
                                    <span className="text-sm text-gray-800 leading-5">{opt.label}</span>
                                </label>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between gap-2 p-3 border-t border-gray-100">
                        <button
                            type="button"
                            className="text-sm px-3 py-2 rounded-lg border border-gray-200"
                            onClick={() => onChange([])}
                        >
                            Сбросить
                        </button>
                        <button
                            type="button"
                            className="text-sm px-4 py-2 rounded-lg bg-slate-900 text-white"
                            onClick={() => setOpen(false)}
                        >
                            Готово
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}