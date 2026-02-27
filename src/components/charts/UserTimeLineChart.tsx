import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

type SegmentType = "КПП" | "Мед." | "Работа" | "Обед" | "Душ/Выход";

type Segment = {
    stage: number;
    type: SegmentType;
    title: string;
    start: string; // HH:mm
    end: string; // HH:mm
};

const COLORS: Record<SegmentType, string> = {
    "КПП": "#3B82F6",
    "Мед.": "#EF4444",
    "Работа": "#7C3AED",
    "Обед": "#F59E0B",
    "Душ/Выход": "#84CC16",
};

const parseToTs = (dateISO: string, hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    const d = new Date(`${dateISO}T00:00:00.000Z`);
    d.setUTCHours(h, m, 0, 0);
    return d.getTime();
};

const fmtHHmm = (ts: number) => {
    const d = new Date(ts);
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
};

interface Prop {
    who: string;
}

const UserTimeLineChart = ({who} : Prop) => {
    const dateISO = "2026-02-04";

    const segments: Segment[] = useMemo(
        () => [
            { stage: 1, type: "КПП", title: "КПП", start: "08:00", end: "08:15" },
            { stage: 2, type: "Мед.", title: "Медпункт", start: "08:15", end: "08:30" },
            { stage: 3, type: "Работа", title: "Рабочая зона", start: "08:30", end: "13:00" },
            { stage: 4, type: "Обед", title: "Столовая", start: "13:00", end: "14:00" },
            { stage: 5, type: "Работа", title: "Рабочая зона", start: "14:00", end: "17:30" },
            { stage: 6, type: "Душ/Выход", title: "Душ/Выход", start: "17:30", end: "18:00" },
        ],
        []
    );

    const minTs = useMemo(() => parseToTs(dateISO, "08:00"), [dateISO]);
    const maxTs = useMemo(() => parseToTs(dateISO, "19:00"), [dateISO]);

    const data = useMemo(
        () =>
            segments.map((s) => ({
                value: [parseToTs(dateISO, s.start), parseToTs(dateISO, s.end), 0, s.title, s.type],
            })),
        [segments]
    );

    const option = useMemo(
        () => ({
            backgroundColor: "transparent",
            animation: false,
            title: {
                text: (who==="sup" ? "Маршрут смены руководителя: Иванов Иван Иванович (Face ID Tracking)" : "Маршрут смены сотрудника: Иванов Иван Иванович (Face ID Tracking)"),
                subtext: "4 февраля 2026 г. • Последовательность движений",
                left: 14,
                top: 10,
                textStyle: { fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.95)" },
                subtextStyle: { fontSize: 12, color: "rgba(255,255,255,0.65)" },
            },
            legend: {
                top: 14,
                right: 14,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 12,
                icon: "roundRect",
                textStyle: { color: "rgba(255,255,255,0.70)", fontSize: 11 },
                data: Object.keys(COLORS),
            },
            grid: {
                left: 14,
                right: 14,
                top: 86,
                bottom: 18,
                containLabel: true,
            },
            tooltip: {
                trigger: "item",
                backgroundColor: "rgba(17,24,39,0.95)",
                borderWidth: 0,
                textStyle: { color: "#fff" },
                formatter: (p: any) => {
                    const v = p?.value;
                    const start = fmtHHmm(v?.[0]);
                    const end = fmtHHmm(v?.[1]);
                    const title = v?.[3] ?? "";
                    const type = v?.[4] ?? "";
                    return `<div style="font-weight:800;margin-bottom:6px;\">${type}</div><div style=\"opacity:0.95;\">${title}</div><div style=\"margin-top:6px;opacity:0.75;\">${start} – ${end}</div>`;
                },
            },
            xAxis: {
                type: "time",
                min: minTs,
                max: maxTs,
                position: "top",
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: true, lineStyle: { color: "rgba(255,255,255,0.07)" } },
                axisLabel: {
                    color: "rgba(255,255,255,0.40)",
                    fontSize: 11,
                    margin: 16,
                    formatter: (val: number) => fmtHHmm(val),
                },
            },
            yAxis: {
                type: "category",
                data: [""],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false },
            },
            series: [
                // Base rail
                {
                    type: "custom",
                    silent: true,
                    renderItem: (params: any, api: any) => {
                        const y = 0;
                        const startCoord = api.coord([minTs, y]);
                        const endCoord = api.coord([maxTs, y]);
                        const height = 34;

                        const rectShape = echarts.graphic.clipRectByRect(
                            {
                                x: startCoord[0],
                                y: startCoord[1] - height / 2,
                                width: endCoord[0] - startCoord[0],
                                height,
                            },
                            {
                                x: params.coordSys.x,
                                y: params.coordSys.y,
                                width: params.coordSys.width,
                                height: params.coordSys.height,
                            }
                        );
                        if (!rectShape) return null;

                        return {
                            type: "rect",
                            shape: rectShape,
                            style: { fill: "rgba(255,255,255,0.06)" },
                        };
                    },
                    data: [{ value: [minTs, maxTs, 0] }],
                },
                // Colored segments
                {
                    type: "custom",
                    renderItem: (params: any, api: any) => {
                        const start = api.value(0);
                        const end = api.value(1);
                        const y = api.value(2);
                        const type = api.value(4) as SegmentType;

                        const startCoord = api.coord([start, y]);
                        const endCoord = api.coord([end, y]);
                        const height = 34;

                        const rectShape = echarts.graphic.clipRectByRect(
                            {
                                x: startCoord[0],
                                y: startCoord[1] - height / 2,
                                width: endCoord[0] - startCoord[0],
                                height,
                            },
                            {
                                x: params.coordSys.x,
                                y: params.coordSys.y,
                                width: params.coordSys.width,
                                height: params.coordSys.height,
                            }
                        );

                        if (!rectShape || rectShape.width <= 2) return null;

                        return {
                            type: "rect",
                            shape: rectShape,
                            style: { fill: COLORS[type] },
                        };
                    },
                    encode: { x: [0, 1], y: 2 },
                    data,
                },
            ],
        }),
        [data, minTs, maxTs]
    );

    return (
        <div className="w-full">
            <div className="rounded-2xl bg-[rgb(41,46,59)] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                <div className="p-3">
                    <ReactECharts echarts={echarts} option={option} style={{ height: 210, width: "100%" }} notMerge={true} lazyUpdate={true} />
                </div>

                <div className="px-6 pb-6">
                    <div className="grid grid-cols-6 gap-6">
                        {segments.map((s) => (
                            <div key={s.stage} className="flex gap-3">
                                <div className="w-[3px] rounded-full" style={{ backgroundColor: COLORS[s.type] }} />
                                <div className="min-w-0">
                                    <div className="text-[10px] tracking-widest uppercase text-[rgba(255,255,255,0.55)]">Этап {s.stage}</div>
                                    <div className="mt-1 text-sm font-extrabold text-white leading-tight">{s.title}</div>
                                    <div className="mt-1 text-xs text-[rgba(255,255,255,0.70)]">
                                        {s.start} - {s.end}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTimeLineChart;
