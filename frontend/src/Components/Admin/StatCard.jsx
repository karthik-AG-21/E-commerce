
import { BsHandbag } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { LuUsers } from "react-icons/lu";
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function StatCard({ users, allOrders, totalPrice, products }) {
    const navigate = useNavigate();

    const totalOrders = allOrders?.length ?? 0;
    const totalProducts = products?.data?.length ?? 0;
    const totalUsers = users?.length ?? 0;

    const cards = [
        {
            title: "Total Revenue",
            value: `$${Number(totalPrice || 0).toLocaleString("en-US")}`,
            icon: BsHandbag,
            iconStyle: "bg-indigo-500/15 text-indigo-400",
            accent: "group-hover:border-indigo-500/40",
            route: "/Dashboard",
        },
        {
            title: "Total Orders",
            value: totalOrders.toLocaleString("en-US"),
            icon: TiShoppingCart,
            iconStyle: "bg-sky-500/15 text-sky-400",
            accent: "group-hover:border-sky-500/40",
            route: "/Dashboard/Admin-orders",
        },
        {
            title: "Total Users",
            value: totalUsers.toLocaleString("en-US"),
            icon: LuUsers,
            iconStyle: "bg-emerald-500/15 text-emerald-400",
            accent: "group-hover:border-emerald-500/40",
            route: "/Dashboard/Admin-users",
        },
        {
            title: "Total Products",
            value: totalProducts.toLocaleString("en-US"),
            icon: FiPackage,
            iconStyle: "bg-orange-500/15 text-orange-400",
            accent: "group-hover:border-orange-500/40",
            route: "/Dashboard/Admin-products",
        },
    ];

    return (
        <section
            aria-label="Dashboard statistics"
            className="
                grid w-full min-w-0
                grid-cols-1 gap-4
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <button
                        key={card.title}
                        type="button"
                        onClick={() => navigate(card.route)}
                        className={`
                            group relative min-w-0 overflow-hidden
                            rounded-2xl border border-white/[0.07]
                            bg-gradient-to-br from-[#171F30] to-[#121926]
                            p-5 text-left
                            shadow-sm shadow-black/10
                            transition-all duration-200
                            hover:-translate-y-1 hover:shadow-lg
                            hover:shadow-black/20
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-indigo-400
                            active:translate-y-0
                            ${card.accent}
                        `}
                    >
                        {/* Subtle decorative accent */}
                        <div
                            className="
                                pointer-events-none absolute -right-8 -top-8
                                h-24 w-24 rounded-full
                                bg-white/[0.025] blur-2xl
                                transition-colors duration-200
                                group-hover:bg-white/[0.06]
                            "
                        />

                        <div className="relative flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-400">
                                    {card.title}
                                </p>

                                <p
                                    className="
                                        mt-3 break-words
                                        text-2xl font-bold tracking-tight
                                        text-white
                                        sm:text-3xl
                                    "
                                >
                                    {card.value}
                                </p>
                            </div>

                            <div
                                className={`
                                    flex h-11 w-11 shrink-0
                                    items-center justify-center
                                    rounded-xl
                                    ${card.iconStyle}
                                `}
                            >
                                <Icon className="text-xl" />
                            </div>
                        </div>

                        <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.07] pt-3">
                            <span className="text-xs text-slate-500">
                                Overall
                            </span>

                            <span className="text-xs font-medium text-slate-400 transition-colors group-hover:text-white">
                                View details
                                <span className="ml-1" aria-hidden="true">
                                    →
                                </span>
                            </span>
                        </div>
                    </button>
                );
            })}
        </section>
    );
}

export default StatCard;
