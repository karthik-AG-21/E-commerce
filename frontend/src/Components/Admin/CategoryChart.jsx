
import { PieChart, Pie, Cell, ResponsiveContainer, } from "recharts";


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

    const categoryData = categoryConfig.map((category) => ({ ...category, value: products.filter(
            (product) => product.category === category.category).length,}));

            console.log(categoryData)

    return (
        <div className="bg-[#111827] text-white backdrop-blur-md p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-5">
                Products by Category
            </h2>

            <div className="flex items-center gap-6">

                {/* Donut */}
                <div className="w-1/2 h-[250px] relative">

                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>

                            <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={60}
                                outerRadius={90} paddingAngle={2}>
                                {categoryData.map((item, index) => (
                                    <Cell key={index} fill={item.chartColor} />
                                ))}
                            </Pie>

                        </PieChart >
                    </ResponsiveContainer>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-bold">
                            {products.length}
                        </span>

                        <span className="text-gray-400">
                            Total
                        </span>
                    </div>

                </div>

                {/* Category list */}
                <div className="flex-1 space-y-4">

                    {
                        categoryData.map((category) => (
                            <div key={category.name} className="flex items-center justify-between" >
                                <div className="flex items-center gap-2">

                                    <span className={`w-3 h-3 rounded-full ${category.color}`} ></span>

                                    <span>{category.name}</span>

                                </div>

                                <span>{category.value}</span>
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    );
};

export default CategoryChart;