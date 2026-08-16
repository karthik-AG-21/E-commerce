import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "May 1", revenue: 2500 },
  { day: "May 2", revenue: 2200 },
  { day: "May 3", revenue: 2900 },
  { day: "May 4", revenue: 3300 },
  { day: "May 5", revenue: 4900 },
  { day: "May 6", revenue: 5800 },
  { day: "May 7", revenue: 4600 },
  { day: "May 8", revenue: 3800 },
  { day: "May 9", revenue: 3500 },
  { day: "May 10", revenue: 2800 },
  { day: "May 11", revenue: 2900 },
  { day: "May 12", revenue: 3600 },
  { day: "May 13", revenue: 4300 },
  { day: "May 14", revenue: 4700 },
  { day: "May 15", revenue: 5000 },
  { day: "May 16", revenue: 5500 },
  { day: "May 17", revenue: 5800 },
  { day: "May 18", revenue: 5100 },
  { day: "May 19", revenue: 4400 },
  { day: "May 20", revenue: 3600 },
  { day: "May 21", revenue: 3900 },
  { day: "May 22", revenue: 3900 },
  { day: "May 23", revenue: 3800 },
  { day: "May 24", revenue: 4800 },
  { day: "May 25", revenue: 5300 },
  { day: "May 26", revenue: 4800 },
  { day: "May 27", revenue: 4500 },
  { day: "May 28", revenue: 4400 },
  { day: "May 29", revenue: 5200 },
  { day: "May 30", revenue: 6100 },
  { day: "May 31", revenue: 7000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-[#111827] text-white p-5 rounded-xl border border-gray-800">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Revenue Overview
        </h2>

        <select className="bg-[#1b2535] border border-gray-700 rounded-lg px-4 py-2 text-sm">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>

      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={245}>

        <AreaChart data={data}>

          {/* Gradient */}
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

          {/* Grid */}
          <CartesianGrid
            vertical={false}
            stroke="#263244"
          />

          {/* X Axis */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 13 }}
            interval={4}
          />

          {/* Y Axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 13 }}
            domain={[0, 8000]}
            tickFormatter={(value) => `$${value / 1000}K`}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value) => [`$${value}`, "Revenue"]}
          />

          {/* Revenue Line + Area */}
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#7c5cff"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            dot={{
              r: 3,
              fill: "#7c5cff",
              stroke: "#c4b5fd",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;