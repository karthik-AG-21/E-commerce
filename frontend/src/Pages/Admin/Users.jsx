import { useEffect, useState } from "react";
import useGetUsers from "../../hooks/Admin/useGetUsers"
import useUpdateUserStatus from "../../hooks/Admin/useUpdateUserStatus"
import SideBar from "../../Components/Admin/AdminSidebar"
import Header from "../../Components/Admin/AdminHeader"
import { CiFilter } from "react-icons/ci";

function AdminUsers() {

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("newest-users");

    const itemsPerPage = 8;

    const { data, isLoading, isError, error, isFetching } = useGetUsers({
         page: currentPage, limit: itemsPerPage, search: debouncedSearch, filter, sort });

    console.log("Full response:", data);
    console.log("Users array:", data?.data);
    console.log("Loading:", isLoading);
    console.log("Error:", error);

    const updateUserStatus = useUpdateUserStatus();


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const users = data?.data ?? [];
    const totalPage = data?.pagination?.totalPages ?? 0;
    const totalUsers = data?.pagination?.totalUsers ?? 0;

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function handleFilter(e) {
        setFilter(e.target.value);
        setCurrentPage(1);
    }

    function handleSort(e) {
        setSort(e.target.value);
        setCurrentPage(1);
    }

    function handleBlock(user) {
        updateUserStatus.mutate(
            {
                userId: user._id,
                status: !user.isBlocked,
            },
            {
                onSuccess: () => {
                    console.log("User status updated successfully");
                },
                onError: (error) => {
                    console.error(
                        "Failed to update user status:",
                        error.response?.data?.message || error.message
                    );
                },
            }
        );
    }

    if (isLoading) return <h1>Loading users...</h1>;

    if (isError) return <h1>{error.message || "Something went wrong"}</h1>;



    return (
        <div className="min-h-screen w-full overflow-x-clip bg-[#0F1420] text-white">
            <SideBar />

            <main className="min-h-screen min-w-0 w-full md:ml-64 md:w-[calc(100%-16rem)]">
                <Header page="Users" content="Dashboard / Users" />

                <div className="min-w-0 space-y-5 p-3 sm:p-5 lg:p-6">

                    {/* Page heading */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl">
                                User Management
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Manage users, account status and access.
                            </p>
                        </div>

                        <div className="w-fit rounded-xl border border-white/10 bg-[#171E2D] px-4 py-2 text-sm text-slate-300">
                            Total users: <span className="font-semibold text-white">{totalUsers}</span>
                        </div>
                    </div>

                    {/* Search, filter and sorting */}
                    <section className="rounded-2xl border border-white/[0.07] bg-[#111827] p-3 sm:p-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(200px,1fr)_190px_190px]">

                            <input
                                type="search"
                                placeholder="Search users..."
                                value={search}
                                onChange={handleSearch}
                                aria-label="Search users"
                                className="h-11 min-w-0 rounded-xl border border-white/10 bg-[#0F1420] px-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            <div className="relative min-w-0">
                                <CiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

                                <select
                                    value={filter}
                                    onChange={handleFilter}
                                    aria-label="Filter by user status"
                                    className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#0F1420] pl-10 pr-3 text-sm text-white outline-none focus:border-indigo-500"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Blocked</option>
                                </select>
                            </div>

                            <select
                                value={sort}
                                onChange={handleSort}
                                aria-label="Sort users"
                                className="h-11 w-full rounded-xl border border-white/10 bg-[#0F1420] px-3 text-sm text-white outline-none focus:border-indigo-500"
                            >
                                <option value="newest-users">Newest Users</option>
                                <option value="oldest-users">Oldest Users</option>
                                <option value="a-z">Name: A - Z</option>
                                <option value="z-a">Name: Z - A</option>
                            </select>
                        </div>
                    </section>

                    {/* Users table card */}
                    <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111827]">

                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] px-4 py-4 sm:px-5">
                            <h3 className="font-semibold">All Users</h3>

                            <span className="text-xs text-slate-400 sm:text-sm">
                                {isFetching ? "Updating..." : `${users.length} users on this page`}
                            </span>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left text-sm">

                                <thead>
                                    <tr className="border-b border-white/[0.07] text-xs uppercase tracking-wider text-slate-500">
                                        <th className="px-5 py-4 font-medium">ID</th>
                                        <th className="px-5 py-4 font-medium">Name</th>
                                        <th className="px-5 py-4 font-medium">Email</th>
                                        <th className="px-5 py-4 font-medium">Role</th>
                                        <th className="px-5 py-4 font-medium">Orders</th>
                                        <th className="px-5 py-4 font-medium">Status</th>
                                        <th className="px-5 py-4 font-medium">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-white/[0.05]">
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr
                                                key={user._id}
                                                className="transition-colors hover:bg-white/[0.025]"
                                            >
                                                <td className="px-5 py-4 text-slate-400">
                                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                                </td>

                                                <td className="px-5 py-4 font-medium text-slate-200">
                                                    {user.name}
                                                </td>

                                                <td className="max-w-[260px] truncate px-5 py-4 text-slate-400">
                                                    {user.email}
                                                </td>

                                                <td className="px-5 py-4 capitalize text-slate-300">
                                                    {user.role}
                                                </td>

                                                <td className="px-5 py-4 text-slate-300">
                                                    {user.orders ?? 0}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${user.isBlocked
                                                                ? "bg-red-500/10 text-red-400"
                                                                : "bg-emerald-500/10 text-emerald-400"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${user.isBlocked
                                                                    ? "bg-red-400"
                                                                    : "bg-emerald-400"
                                                                }`}
                                                        />
                                                        {user.isBlocked ? "Blocked" : "Active"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <button
                                                        type="button"
                                                        disabled={updateUserStatus.isPending}
                                                        onClick={() => handleBlock(user)}
                                                        className={`min-h-9 min-w-20 rounded-lg px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${user.isBlocked
                                                                ? "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                                                                : "bg-red-500/10 text-red-300 hover:bg-red-500/20"
                                                            }`}
                                                    >
                                                        {user.isBlocked ? "Unblock" : "Block"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-5 py-14 text-center">
                                                <p className="text-slate-300">No users found</p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Try changing your search or filters.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col gap-4 border-t border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                            <p className="text-sm text-slate-400">
                                {debouncedSearch || filter
                                    ? `Matching users: ${totalUsers}`
                                    : `Total users: ${totalUsers}`}
                            </p>

                            <div className="flex items-center justify-between gap-3 sm:justify-end">
                                <button
                                    type="button"
                                    disabled={currentPage <= 1 || isFetching}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className="min-h-10 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span className="whitespace-nowrap text-xs text-slate-400 sm:text-sm">
                                    Page {currentPage} of {Math.max(totalPage, 1)}
                                </span>

                                <button
                                    type="button"
                                    disabled={
                                        currentPage >= totalPage ||
                                        isFetching ||
                                        totalPage === 0
                                    }
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className="min-h-10 rounded-lg border border-indigo-500/30 bg-indigo-600 px-3 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
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

export default AdminUsers;