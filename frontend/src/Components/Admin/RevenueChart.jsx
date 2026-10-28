
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ allOrders = [] }) => {
    const revenueMap = {};

    allOrders.forEach((order) => {
        if (!order?.createdAt) return;

        const date = new Date(order.createdAt);

        if (Number.isNaN(date.getTime())) return;

        const dateKey = date.toISOString().split("T")[0];

        revenueMap[dateKey] =
            (revenueMap[dateKey] || 0) +
            Number(order?.totalAmount || 0);
    });

    const revenueData = Object.entries(revenueMap)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, revenue]) => ({
            day: new Date(`${date}T00:00:00`).toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric",
                }
            ),
            revenue,
        }));

    return (
        <div className="
            w-full min-w-0 overflow-hidden
            rounded-xl border border-white/5
            bg-[#111827] p-4 text-white
            sm:p-5
        ">
            {/* Header */}
            <div className="mb-5">
                <h2 className="text-lg font-semibold sm:text-xl">
                    Revenue Overview
                </h2>
                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Daily revenue performance
                </p>
            </div>

            {/* Responsive chart */}
            <div className="h-[230px] w-full min-w-0 sm:h-[280px] lg:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={revenueData}
                        margin={{
                            top: 8,
                            right: 8,
                            left: -12,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="revenueGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#7c5cff"
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#7c5cff"
                                    stopOpacity={0.03}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            stroke="#263244"
                        />

                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#9ca3af",
                                fontSize: 11,
                            }}
                            tickMargin={10}
                            minTickGap={20}
                            interval="preserveStartEnd"
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={55}
                            tick={{
                                fill: "#9ca3af",
                                fontSize: 11,
                            }}
                            tickFormatter={(value) =>
                                `$${Number(value).toLocaleString("en-US", {
                                    notation: "compact",
                                    maximumFractionDigits: 1,
                                })}`
                            }
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111827",
                                border: "1px solid #374151",
                                borderRadius: "10px",
                                color: "#fff",
                                fontSize: "13px",
                            }}
                            labelStyle={{
                                color: "#d1d5db",
                                marginBottom: "4px",
                            }}
                            formatter={(value) => [
                                `$${Number(value).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}`,
                                "Revenue",
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#7c5cff"
                            strokeWidth={2.5}
                            fill="url(#revenueGradient)"
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: "#7c5cff",
                                stroke: "#c4b5fd",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {revenueData.length === 0 && (
                <p className="mt-2 text-center text-sm text-gray-400">
                    No revenue data available yet.
                </p>
            )}
        </div>
    );
};

export default RevenueChart;
