
import { useNavigate } from "react-router-dom";

function Header({ page, content, role }) {
    const navigate = useNavigate();

    let name;

    try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        name = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";
    } catch {
        name = "A";
    }

    return (
        <header
            className="
                relative flex w-full min-w-0
                items-center justify-between gap-3
                border-b border-white/10
                bg-[#0F1420]
                px-3 py-4 pl-16
                sm:px-5 sm:py-4 sm:pl-16
                lg:px-6 lg:pl-6
            "
        >
            {/* Page title and breadcrumb */}
            <div className="min-w-0 flex-1">
                <h1
                    className="
                        truncate text-xl font-bold text-white
                        sm:text-2xl
                        lg:text-3xl
                    "
                >
                    {page}
                </h1>

                <p
                    onClick={() => navigate("/Dashboard")}
                    className="
                        mt-1 w-fit max-w-full cursor-pointer
                        truncate text-xs text-indigo-300
                        transition-colors hover:text-indigo-200
                        sm:text-sm
                    "
                >
                    {content}
                    <span className="text-white">{role}</span>
                </p>
            </div>

            {/* Admin profile */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <div
                    className="
                        flex h-9 w-9 shrink-0 items-center
                        justify-center rounded-full
                        bg-blue-700
                        sm:h-10 sm:w-10
                    "
                >
                    <span className="text-sm font-semibold text-white sm:text-base">
                        {name}
                    </span>
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-white sm:text-base lg:text-xl">
                        Admin
                    </h2>

                    <p className="hidden text-xs text-gray-400 sm:block sm:text-sm">
                        Administrator
                    </p>
                </div>
            </div>
        </header>
    );
}

export default Header;
