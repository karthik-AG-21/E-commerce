
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const categoryConfig = [
    {
        name: "Smartphones",
        category: "smartphones",
        color: "bg-red-500",
        chartColor: "#ef4444",
    },
    {
        name: "Laptops",
        category: "laptops",
        color: "bg-blue-500",
        chartColor: "#3b82f6",
    },
    {
        name: "Accessories",
        category: "mobile-accessories",
        color: "bg-green-500",
        chartColor: "#22c55e",
    },
    {
        name: "Tablets",
        category: "tablets",
        color: "bg-yellow-500",
        chartColor: "#eab308",
    },
];

const CategoryChart = ({ products = [] }) => {
    // Supports both an array and an API response containing data.
    const productList = Array.isArray(products)
        ? products
        : Array.isArray(products?.data)
        ? products.data
        : [];

    const categoryData = categoryConfig.map((category) => ({
        ...category,
        value: productList.filter(
            (product) => product.category === category.category
        ).length,
    }));

    return (
        <div className="w-full min-w-0 rounded-xl border border-white/5 bg-[#111827] p-4 text-white sm:p-5">
            <h2 className="mb-4 text-lg font-semibold sm:mb-5 sm:text-xl">
                Products by Category
            </h2>

            <div className="grid min-w-0 grid-cols-1 items-center gap-4 sm:gap-5 xl:grid-cols-2">
                {/* Donut chart */}
                <div className="relative mx-auto h-56 w-full min-w-0 max-w-[280px] sm:h-64 xl:h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="55%"
                                outerRadius="78%"
                                paddingAngle={2}
                            >
                                {categoryData.map((item) => (
                                    <Cell
                                        key={item.category}
                                        fill={item.chartColor}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center total */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">
                            {productList.length}
                        </span>
                        <span className="text-sm text-gray-400">
                            Total
                        </span>
                    </div>
                </div>

                {/* Category legend */}
                <div className="min-w-0 space-y-4">
                    {categoryData.map((category) => (
                        <div
                            key={category.category}
                            className="flex min-w-0 items-center justify-between gap-3 text-sm sm:text-base"
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <span
                                    className={`h-3 w-3 shrink-0 rounded-full ${category.color}`}
                                />
                                <span className="truncate">
                                    {category.name}
                                </span>
                            </div>

                            <span className="shrink-0 font-medium tabular-nums">
                                {category.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryChart;
