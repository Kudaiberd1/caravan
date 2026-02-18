import ReactECharts from "echarts-for-react";

type Point = { day: string; value: number };

const data: Point[] = [
    {day: "Mon", value: 94},
    {day: "Tue", value: 96},
    {day: "Wed", value: 88},
    {day: "Thu", value: 92},
    {day: "Fri", value: 95},
    {day: "Sat", value: 98},
    {day: "Sun", value: 97},
];


export default function SmoothAreaChart() {
    const option = {
        grid: {left: 40, right: 20, top: 20, bottom: 35},
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: data.map((d) => d.day),
            axisTick: {show: false},
            axisLine: {lineStyle: {color: "#E5E7EB"}},
            axisLabel: {color: "#6B7280"},
        },
        yAxis: {
            type: "value",
            min: 80,
            max: 100,
            splitNumber: 10,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {color: "#6B7280"},
            splitLine: {lineStyle: {color: "#EEF2F7"}},
        },
        tooltip: {trigger: "axis"},
        series: [
            {
                type: "line",
                smooth: true,
                symbol: "circle",
                symbolSize: 10,
                data: data.map((d) => d.value),

                lineStyle: {width: 4, color: "#7C3AED"},
                itemStyle: {color: "#7C3AED"},

                areaStyle: {color: "rgba(124, 58, 237, 0.12)"},

                emphasis: {focus: "series"},
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{height: 260, width: "100%"}}
            notMerge={true}
            lazyUpdate={true}
        />
    );
}