import {useMemo} from "react";
import ReactECharts from "echarts-for-react";

type SpiderChartProps = {
    selectedLabels: string[]; // department labels OR team labels
    variant?: "department" | "team";
};

type DeptRadarDemo = {
    radar: number[]; // [Отклонения, Переработки, Непунктуальность, Опасность, Недоработки]
    percent: number;
};

const DEMO: Record<string, DeptRadarDemo> = {
    "Департамент горного производства": {radar: [92, 20, 12, 88, 78], percent: 94.2},
    "Металлургический департамент": {radar: [72, 38, 26, 62, 70], percent: 88.5},
    "Департамент кучного выщелачивания": {radar: [80, 28, 22, 58, 74], percent: 91.1},
    "Технологический департамент": {radar: [66, 44, 30, 52, 60], percent: 86.4},
    "Департамент производственного обеспечения": {radar: [74, 34, 18, 56, 68], percent: 89.7},
    "Департамент материально-технического обеспечения": {radar: [70, 30, 16, 54, 62], percent: 87.9},
    "Финансовый департамент": {radar: [58, 24, 14, 40, 50], percent: 83.2},
    "Генеральная дирекция": {radar: [62, 26, 12, 44, 54], percent: 84.6},
};

function stableDemoFor(label: string): DeptRadarDemo {
    // If department label isn't in DEMO, create deterministic demo values from the string.
    const base = Array.from(label).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const radar = [
        55 + (base % 40),
        18 + (base % 35),
        10 + (base % 30),
        38 + (base % 45),
        45 + (base % 40),
    ].map((v) => Math.max(0, Math.min(100, v)));
    const percent = Math.max(60, Math.min(100, 75 + (base % 25)));
    return {radar, percent: Number(percent.toFixed(1))};
}

export default function SpiderChart({selectedLabels, variant = "department"}: SpiderChartProps) {
    // render ALL selected labels (unique)
    const chosen = useMemo(() => {
        return Array.from(new Set(selectedLabels));
    }, [selectedLabels]);

    const palette = useMemo(() => {
        const dept = [
            {line: "#7C3AED", area: "rgba(124,58,237,0.20)", bar: "bg-[rgb(49,57,91)]"},
            {line: "#9CA3AF", area: "rgba(156,163,175,0.18)", bar: "bg-gray-400"},
            {line: "#2563EB", area: "rgba(37,99,235,0.18)", bar: "bg-blue-600"},
            {line: "#10B981", area: "rgba(16,185,129,0.16)", bar: "bg-emerald-500"},
            {line: "#F59E0B", area: "rgba(245,158,11,0.16)", bar: "bg-amber-500"},
            {line: "#EF4444", area: "rgba(239,68,68,0.14)", bar: "bg-red-500"},
        ];

        const team = [
            {line: "#EF4444", area: "rgba(239,68,68,0.18)", bar: "bg-red-500"},
            {line: "#2563EB", area: "rgba(37,99,235,0.18)", bar: "bg-blue-600"},
            {line: "#9CA3AF", area: "rgba(156,163,175,0.18)", bar: "bg-gray-400"},
            {line: "#7C3AED", area: "rgba(124,58,237,0.20)", bar: "bg-[rgb(49,57,91)]"},
            {line: "#10B981", area: "rgba(16,185,129,0.16)", bar: "bg-emerald-500"},
            {line: "#F59E0B", area: "rgba(245,158,11,0.16)", bar: "bg-amber-500"},
        ];

        return variant === "team" ? team : dept;
    }, [variant]);

    const rows = useMemo(() => {
        return chosen.map((label, idx) => {
            const demo = DEMO[label] ?? stableDemoFor(label);
            const colors = palette[idx % palette.length];
            return {
                label,
                percent: demo.percent,
                radar: demo.radar,
                colors,
            };
        });
    }, [chosen, palette]);

    const option = useMemo(() => {
        return {
            tooltip: {trigger: "item"},
            radar: {
                center: ["50%", "48%"],
                radius: "68%",
                nameGap: 18,
                startAngle: 90,
                splitNumber: 6,
                indicator: [
                    {name: "Отклонения", max: 100},
                    {name: "Переработки", max: 100},
                    {name: "Непунктуальность", max: 100},
                    {name: "Опасность", max: 100},
                    {name: "Недоработки", max: 100},
                ],
                axisName: {
                    color: "#9CA3AF",
                    fontSize: 13,
                    fontWeight: 500,
                    formatter: (name: string) => (name.length > 14 ? name.slice(0, 14) + "…" : name),
                },
                splitLine: {lineStyle: {color: "#E5E7EB"}},
                splitArea: {show: false},
                axisLine: {lineStyle: {color: "#E5E7EB"}},
            },
            series: [
                {
                    type: "radar",
                    data: rows.map((r, idx) => {
                        const lineColor = r.colors.line;
                        const areaColor = r.colors.area;
                        return {
                            name: r.label,
                            value: r.radar,
                            symbol: "circle",
                            symbolSize: idx === 0 ? 10 : 9,
                            lineStyle: {width: 3, color: lineColor},
                            itemStyle: {color: lineColor},
                            areaStyle: {color: areaColor},
                        };
                    }),
                },
            ],
        };
    }, [rows]);

    return (
        <div className="w-full">
            <div className="w-full h-[300px] flex items-center justify-center">
                <ReactECharts
                    option={option}
                    style={{height: "100%", width: "100%"}}
                    notMerge={true}
                />
            </div>

            <div
                className={
                    "mt-6 space-y-6 " +
                    (rows.length > 3 ? "max-h-[250px] overflow-y-auto pr-2" : "")
                }
            >
                {rows.length === 0 ? (
                    <div className="text-sm text-gray-400">
                        {variant === "team"
                            ? "Выберите руководителя в выпадающем списке."
                            : "Выберите департамент в расширенных фильтрах."}
                    </div>
                ) : (
                    rows.map((r) => {
                        const barClass = r.colors.bar;
                        return (
                            <div key={r.label} className="space-y-3">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="font-semibold text-gray-600 truncate">
                                        {r.label}
                                    </div>
                                    <div className="font-extrabold" style={{ color: r.colors.line }}>
                                        {r.percent.toFixed(1)}%
                                    </div>
                                </div>

                                <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${barClass}`}
                                        style={{width: `${Math.max(0, Math.min(100, r.percent))}%`}}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}