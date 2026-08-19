import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";


const RevenueChart = ({ allOrders = [] }) => {


  console.log(allOrders, "checkiing for date")

  const revenueMap = {};

  allOrders.forEach((order) => {
    const date = new Date(order.orderedAt);

    const dateKey = date.toISOString().split("T")[0];

    if (!revenueMap[dateKey]) {
      revenueMap[dateKey] = 0;
    }

    revenueMap[dateKey] += Number(order.totalPrice);
  });

  const revenueData = Object.entries(revenueMap)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .map(([date, revenue]) => ({
      day: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue,
    }));

  console.log("Revenue Data:", revenueData);

  return (
    <div className="bg-[#111827] text-white p-5 rounded-xl border border-gray-800">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-semibold">
          Revenue Overview
        </h2>

       
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={245}>

        <AreaChart data={revenueData} >

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
            interval="preserveStartEnd"
          />

          {/* Y Axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 13 }}
            tickFormatter={(value) => `$${value}`}
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