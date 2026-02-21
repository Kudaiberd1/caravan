import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export default function DivergingBarChart() {
    // demo values close to the screenshot scale (-0.6..0.8)
    const values = useMemo(
        () => [
            0.2, 0.4, -0.1, -0.3, 0.5, 0.8, -0.2, 0.1, 0.3, -0.4,
            -0.6, 0.2, 0.1, 0.4, 0.6, -0.2, -0.1, 0.3, 0.1, -0.2,
        ],
        []
    );

    const option = useMemo(() => {
        return {
            animation: false,
            grid: { left: 46, right: 20, top: 10, bottom: 20 },
            xAxis: {
                type: "category",
                data: values.map((_, i) => String(i + 1)),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false },
            },
            yAxis: {
                type: "value",
                min: -0.6,
                max: 0.8,
                interval: 0.2,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: "#9CA3AF", fontSize: 12 },
                splitLine: { lineStyle: { color: "#E5E7EB" } },
            },
            series: [
                {
                    type: "bar",
                    data: values,
                    barWidth: 14,
                    itemStyle: {
                        borderRadius: 4,
                        color: (params: any) => (params.value >= 0 ? "#4F7CF3" : "#E35B52"),
                    },
                },
            ],
        };
    }, [values]);

    return (
        <div className="w-full">
            <div className="w-full h-[260px]">
                <ReactECharts
                    option={option}
                    style={{ height: "100%", width: "100%" }}
                    notMerge={true}
                />
            </div>

            {/* Legend row like the design */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#E35B52]" />
                        <span className="text-sm font-semibold text-[#111827]">
              несвоевременно
            </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#4F7CF3]" />
                        <span className="text-sm font-semibold text-[#111827]">
              Через н-к время
            </span>
                    </div>
                </div>

                <div className="text-sm font-semibold text-gray-400">30-дневный</div>
            </div>
        </div>
    );
}