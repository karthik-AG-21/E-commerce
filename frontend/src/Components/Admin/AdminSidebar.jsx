
import { useState } from "react";
import icon from "/shopping-bag.svg";
import { FaUsers } from "react-icons/fa";
import { LuPackage, LuTrash2, LuMenu, LuX } from "react-icons/lu";
import { TiShoppingCart } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            label: "Dashboard",
            path: "/Dashboard",
            icon: RxDashboard,
        },
        {
            label: "Users",
            path: "/Dashboard/Admin-users",
            icon: FaUsers,
        },
        {
            label: "Products",
            path: "/Dashboard/Admin-products",
            icon: LuPackage,
        },
        {
            label: "Orders",
            path: "/Dashboard/Admin-orders",
            icon: TiShoppingCart,
        },
        {
            label: "Trash",
            path: "/Dashboard/Admin-trash",
            icon: LuTrash2,
        },
    ];

    function goTo(path) {
        navigate(path);
        setIsOpen(false);
    }

    function removeUser() {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        setIsOpen(false);
        navigate("/login");
    }

    const isActive = (path) =>
        path === "/Dashboard"
            ? location.pathname === path
            : location.pathname === path;

    return (
        <>
            {/* Mobile menu button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                className="
                    fixed left-3 top-3 z-[60]
                    flex h-10 w-10 items-center justify-center
                    rounded-xl border border-white/10
                    bg-[#171E2D] text-white shadow-lg
                    transition hover:bg-[#222C40]
                    md:hidden
                "
            >
                <LuMenu size={23} />
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-[65] bg-black/60 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-[70]
                    flex h-[100dvh] w-64 max-w-[85vw]
                    flex-col border-r border-white/10
                    bg-[#0F1420] text-white shadow-2xl
                    transition-transform duration-300 ease-in-out
                    md:translate-x-0 md:shadow-none
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Logo */}
                <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-5 py-6">
                    <button
                        type="button"
                        onClick={() => goTo("/Dashboard")}
                        className="flex min-w-0 items-center gap-2"
                    >
                        <img
                            src={icon}
                            className="h-10 w-10 shrink-0"
                            alt="TechStore logo"
                        />
                        <span className="text-2xl font-bold tracking-tight">
                            Tech<span className="text-indigo-400">Store</span>
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close navigation menu"
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
                    >
                        <LuX size={22} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
                    <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Main menu
                    </p>

                    {menuItems.map(({ label, path, icon: Icon }) => (
                        <button
                            key={path}
                            type="button"
                            onClick={() => goTo(path)}
                            aria-current={isActive(path) ? "page" : undefined}
                            className={`
                                flex min-h-11 w-full items-center gap-3
                                rounded-xl px-3 py-3 text-left
                                transition-colors duration-200
                                ${
                                    isActive(path)
                                        ? "bg-indigo-500/15 text-indigo-300"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            <Icon className="shrink-0 text-xl" />
                            <span className="text-sm font-medium">
                                {label}
                            </span>

                            {isActive(path) && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-indigo-400" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <div className="shrink-0 border-t border-white/10 p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
                    <button
                        type="button"
                        onClick={removeUser}
                        className="
                            flex min-h-11 w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-red-400 transition-colors
                            hover:bg-red-500/10 hover:text-red-300
                        "
                    >
                        <MdLogout className="shrink-0 text-xl" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
