import React from "react";
import ReactECharts from "echarts-for-react";

type DeptId =
    | "general"
    | "geology"
    | "internal_control"
    | "mining"
    | "it"
    | "heap_leaching"
    | "logistics"
    | "supply";

type Dept = { id: DeptId; label: string };

const DAYS = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const DATA: Record<DeptId, number[]> = {
    general: [95, 150, 130, 120, 110, 160, 175],
    geology: [80, 135, 120, 110, 100, 145, 155],
    internal_control: [70, 120, 110, 105, 95, 140, 150],
    mining: [110, 240, 200, 160, 180, 260, 220],
    it: [85, 145, 125, 115, 105, 150, 165],
    heap_leaching: [78, 138, 118, 112, 102, 148, 158],
    logistics: [82, 142, 122, 114, 104, 152, 162],
    supply: [76, 130, 116, 108, 98, 146, 156],
};

function makeSeries(selected: Dept[]) {
    return selected.map((d) => ({
        name: d.label,
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        showSymbol: true,
        data: DATA[d.id],
        lineStyle: { width: 3 },
    }));
}

export default function DepartmentLinesChart({
                                                 departments,
                                                 selectedIds,
                                             }: {
    departments: Dept[];
    selectedIds: DeptId[];
}) {
    const selectedDepartments = React.useMemo(
        () => departments.filter((d) => selectedIds.includes(d.id)),
        [departments, selectedIds]
    );

    const option = React.useMemo(() => {
        const series = makeSeries(selectedDepartments);

        return {
            grid: { left: 40, right: 20, top: 20, bottom: 40 },
            tooltip: { trigger: "axis" },
            legend: { show: false },
            xAxis: {
                type: "category",
                data: DAYS,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { fontSize: 12, margin: 18 },
            },
            yAxis: {
                type: "value",
                splitLine: { show: true },
                axisLine: { show: false },
                axisTick: { show: false },
            },
            series,
        };
    }, [selectedDepartments]);

    return (
        <div className="w-full h-[260px]">
            <ReactECharts
                option={option}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: "100%", width: "100%" }}
            />
        </div>
    );
}