import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

const rawDailyDeltaHours: number[] = [
    -0.1, 0.0, 0.3, 0.6, 0.2, -0.8, -1.2, 0.5, 1.0, 0.4,
    0.1, -0.3, -0.6, -0.9, -0.4, -0.2, 0.2, 0.6, 0.2, -1.0,
    -1.5, 0.3, 0.9, 1.6, 0.2, -0.2, -0.1, -2.0, -2.4, -0.5,
];

const formatSignedHours = (v: number) => {
    const abs = Math.abs(v).toFixed(1);
    const sign = v > 0 ? "+" : v < 0 ? "-" : "";
    return `${sign}${abs} ч`;
};

const UserLineChart = () => {
    const days = useMemo(() => rawDailyDeltaHours.map((_, i) => String(i + 1)), []);

    const overwork = useMemo(
        () => rawDailyDeltaHours.map((v) => (v > 0 ? Number(v.toFixed(2)) : 0)),
        []
    );

    const underwork = useMemo(
        () => rawDailyDeltaHours.map((v) => (v < 0 ? Number(v.toFixed(2)) : 0)),
        []
    );

    const totalOverwork = useMemo(
        () => rawDailyDeltaHours.reduce((acc, v) => (v > 0 ? acc + v : acc), 0),
        []
    );

    const totalUnderwork = useMemo(
        () => rawDailyDeltaHours.reduce((acc, v) => (v < 0 ? acc + v : acc), 0),
        []
    );

    const net = useMemo(() => totalOverwork + totalUnderwork, [totalOverwork, totalUnderwork]);

    const option = useMemo(
        () => ({
            backgroundColor: "transparent",
            title: {
                text: "Динамика выработки по сменам (Провал и Компенсация)",
                subtext: "Ежемесячное отклонение от стандартной смены (8 часов)",
                left: 12,
                top: 8,
                textStyle: {
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#111827",
                },
                subtextStyle: {
                    fontSize: 12,
                    color: "#6B7280",
                },
            },
            legend: {
                right: 14,
                top: 12,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: { color: "#111827", fontSize: 12 },
                data: ["Недоработки", "Переработки"],
            },
            tooltip: {
                trigger: "axis",
                axisPointer: { type: "shadow" },
                backgroundColor: "rgba(17,24,39,0.92)",
                borderWidth: 0,
                textStyle: { color: "#fff" },
                formatter: (params: any) => {
                    const day = params?.[0]?.axisValue ?? "";
                    const u = params?.find((p: any) => p.seriesName === "Недоработки")?.data ?? 0;
                    const o = params?.find((p: any) => p.seriesName === "Переработки")?.data ?? 0;
                    const total = (Number(o) || 0) + (Number(u) || 0);

                    const lines = [
                        `<div style="font-weight:700;margin-bottom:6px;">День ${day}</div>`,
                        `<div>Переработки: <b>${formatSignedHours(Math.max(0, Number(o) || 0))}</b></div>`,
                        `<div>Недоработки: <b>${formatSignedHours(Math.min(0, Number(u) || 0))}</b></div>`,
                        `<div style="margin-top:6px;opacity:0.9;">Баланс: <b>${formatSignedHours(total)}</b></div>`,
                    ];
                    return lines.join("");
                },
            },
            grid: {
                left: 12,
                right: 12,
                top: 72,
                bottom: 70,
                containLabel: true,
            },
            xAxis: {
                type: "category",
                data: days,
                axisTick: { alignWithLabel: true },
                axisLine: { lineStyle: { color: "#D1D5DB" } },
                axisLabel: { color: "#6B7280", fontSize: 11 },
            },
            yAxis: {
                type: "value",
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: "#6B7280", fontSize: 11 },
                splitLine: { lineStyle: { color: "#E5E7EB" } },
            },
            series: [
                {
                    name: "Недоработки",
                    type: "bar",
                    data: underwork,
                    barWidth: 10,
                    itemStyle: { color: "#B91C1C", borderRadius: [3, 3, 0, 0] },
                    emphasis: { focus: "series" },
                },
                {
                    name: "Переработки",
                    type: "bar",
                    data: overwork,
                    barWidth: 10,
                    itemStyle: { color: "#22C55E", borderRadius: [3, 3, 0, 0] },
                    emphasis: { focus: "series" },
                },
            ],
        }),
        [days, overwork, underwork]
    );

    return (
        <div className="w-full rounded-2xl bg-gray-50 border border-gray-300 overflow-hidden">
            <div className="p-3">
                <ReactECharts option={option} style={{ height: 320, width: "100%" }} notMerge={true} lazyUpdate={true} />
            </div>

            <div className="h-px bg-gray-300" />

            <div className="grid grid-cols-3 text-center px-6 py-4 bg-gray-50">
                <div>
                    <div className="text-[11px] tracking-widest uppercase text-gray-600">Всего переработок</div>
                    <div className="mt-1 text-lg font-extrabold text-green-600">{formatSignedHours(totalOverwork)}</div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />
                    <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />
                    <div className="text-[11px] tracking-widest uppercase text-gray-600">Всего недоработанного времени</div>
                    <div className="mt-1 text-lg font-extrabold text-red-600">{formatSignedHours(totalUnderwork)}</div>
                </div>

                <div>
                    <div className="text-[11px] tracking-widest uppercase text-gray-600">Чистый баланс</div>
                    <div className={"mt-1 text-lg font-extrabold " + (net >= 0 ? "text-blue-600" : "text-red-600")}>
                        {formatSignedHours(net)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLineChart;