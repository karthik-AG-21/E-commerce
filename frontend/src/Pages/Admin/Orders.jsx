import { CiFilter } from "react-icons/ci";
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import { useState } from "react";
import useUpdateOrderStatus from "../../hooks/Admin/useUpdateOrderStatus";
import useGetAllOrders from "../../hooks/Admin/useGetAllOrders";



function AdminOrders() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data: response, isLoading, error,
    } = useGetAllOrders({ page: currentPage, limit: 8, search, filter, });

    const allOrders = response?.data ?? [];
    const totalPage = response?.pagination?.totalPages ?? 1;

    const updateStatus = useUpdateOrderStatus();

    if (isLoading) {
        return <h1 className="bg-[#0F1420] min-h-screen text-white p-6">
            Loading orders...
        </h1>;
    }

    if (error) {
        return <h1 className="bg-[#0F1420] min-h-screen text-red-400 p-6">
            Failed to load orders.
        </h1>;
    }

    function handleSearch(e) {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    function handleFilter(e) {
        setFilter(e.target.value);
        setCurrentPage(1);
    }

    function handleStatusChange(userId, orderId, status) {

        updateStatus.mutate({ userId, orderId, status, });
    }

    console.log(allOrders[0], "one")


    return (
        <div className="min-h-screen w-full overflow-x-clip bg-[#0F1420] text-white">
            <SideBar />

            <main className="min-h-screen min-w-0 w-full md:ml-64 md:w-[calc(100%-16rem)]">
                <Header page="Orders" content="Dashboard / Orders" />

                <div className="min-w-0 space-y-5 p-3 sm:p-5 lg:p-6">

                    {/* Page heading */}
                    <div>
                        <h2 className="text-xl font-bold sm:text-2xl">
                            Order Management
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Track orders, review payments and update delivery status.
                        </p>
                    </div>

                    {/* Search and filter */}
                    <section className="rounded-2xl border border-white/[0.07] bg-[#111827] p-3 sm:p-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">

                            <input
                                type="search"
                                name="search"
                                placeholder="Search orders..."
                                aria-label="Search orders"
                                value={search}
                                onChange={handleSearch}
                                className="h-10 min-w-0 rounded-lg border border-white/10 bg-[#0F1420] px-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            <div className="relative min-w-0">
                                <CiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

                                <select
                                    value={filter}
                                    onChange={handleFilter}
                                    aria-label="Sort orders"
                                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0F1420] pl-9 pr-3 text-sm text-white outline-none transition focus:border-indigo-500"
                                >
                                    <option value="">All Dates</option>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Orders table */}
                    <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111827]">

                        <div className="border-b border-white/[0.07] px-4 py-4 sm:px-5">
                            <h3 className="font-semibold">All Orders</h3>
                            <p className="mt-1 text-xs text-slate-400">
                                Review order details and manage fulfillment.
                            </p>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-[1050px] text-left text-sm">

                                <thead>
                                    <tr className="border-b border-white/[0.07] text-xs uppercase tracking-wider text-slate-500">
                                        <th className="px-5 py-4 font-medium">No.</th>
                                        <th className="px-5 py-4 font-medium">Order ID</th>
                                        <th className="px-5 py-4 font-medium">Customer</th>
                                        <th className="px-5 py-4 font-medium">Date</th>
                                        <th className="px-5 py-4 font-medium">Amount</th>
                                        <th className="px-5 py-4 font-medium">Payment</th>
                                        <th className="px-5 py-4 font-medium">Status</th>
                                        <th className="px-5 py-4 font-medium">Update Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-white/[0.05]">
                                    {allOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-5 py-14 text-center">
                                                <p className="text-slate-300">No orders found</p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Try changing your search or filter.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        allOrders.map((item, index) => (
                                            <tr
                                                key={item._id}
                                                className="transition-colors hover:bg-white/[0.025]"
                                            >
                                                <td className="px-5 py-4 text-slate-400">
                                                    {(currentPage - 1) * 8 + index + 1}
                                                </td>

                                                <td className="max-w-[180px] px-5 py-4">
                                                    <span
                                                        title={item._id}
                                                        className="block truncate font-mono text-xs text-indigo-300"
                                                    >
                                                        {item._id}
                                                    </span>
                                                </td>

                                                <td className="max-w-[180px] truncate px-5 py-4 font-medium text-slate-200">
                                                    {item?.address?.name || "N/A"}
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                                                    {item?.createdAt &&
                                                        !Number.isNaN(new Date(item.createdAt).getTime())
                                                        ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                        : "N/A"}
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-200">
                                                    ${Math.ceil(Number(item?.totalAmount) || 0)}
                                                </td>

                                                <td className="px-5 py-4 text-slate-400">
                                                    {item?.paymentMethod || "N/A"}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${item.status === "Delivered"
                                                                ? "bg-emerald-500/10 text-emerald-400"
                                                                : item.status === "Cancelled"
                                                                    ? "bg-red-500/10 text-red-400"
                                                                    : item.status === "Shipped"
                                                                        ? "bg-blue-500/10 text-blue-400"
                                                                        : item.status === "Processing"
                                                                            ? "bg-indigo-500/10 text-indigo-300"
                                                                            : "bg-amber-500/10 text-amber-400"
                                                            }`}
                                                    >
                                                        {item.status || "Pending"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <select
                                                        value={item.status || "Pending"}
                                                        disabled={updateStatus.isPending}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                item.user,
                                                                item._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        aria-label={`Update order ${item._id} status`}
                                                        className="h-9 w-36 rounded-lg border border-white/10 bg-[#0F1420] px-2 text-xs text-white outline-none transition focus:border-indigo-500 disabled:opacity-50"
                                                    >
                                                        <option value="Select">Select</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col gap-4 border-t border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                            <p className="text-sm text-slate-400">
                                Page {currentPage} of {Math.max(totalPage, 1)}
                            </p>

                            <div className="flex items-center justify-between gap-3 sm:justify-end">
                                <button
                                    type="button"
                                    disabled={currentPage <= 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className="min-h-10 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span className="whitespace-nowrap text-xs text-slate-400 sm:text-sm">
                                    {currentPage} / {Math.max(totalPage, 1)}
                                </span>

                                <button
                                    type="button"
                                    disabled={currentPage >= totalPage}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className="min-h-10 rounded-lg border border-indigo-500/30 bg-indigo-600 px-3 text-sm text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );

}

export default AdminOrders;