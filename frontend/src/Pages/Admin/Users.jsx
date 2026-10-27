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

    const { data, isLoading, isError, error, isFetching } = useGetUsers
        ({ page: currentPage, limit: itemsPerPage, search: debouncedSearch, filter, sort });

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
        <>
            <div className="flex w-full bg-indigo-900">
                <SideBar />

                <main className="ml-64  bg-[#0F1420] w-full min-h-screen" >

                    <Header page={"Users"} content={"Dashboard/Users"} />
                    <div className="flex justify-end gap-3 border-b-2 border-white/10 py-2 pr-2">
                        <input
                            type="search"
                            placeholder="Search users..."
                            value={search}
                            onChange={handleSearch}
                            className="py-1 px-2 text-white rounded border-2 border-white/20"
                        />

                        <div className="relative flex items-center">
                            <CiFilter className="absolute left-3 z-10 text-white" />

                            <select
                                value={filter}
                                onChange={handleFilter}
                                className="pl-9 pr-4 py-2 border rounded-md text-white bg-[#0F1420]"
                            >
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Blocked</option>
                            </select>
                        </div>

                        <select
                            value={sort}
                            onChange={handleSort}
                            className="px-3 py-2 border rounded-md text-white bg-[#0F1420]"
                        >
                            <option value="newest-users">Newest Users</option>
                            <option value="oldest-users">Oldest Users</option>
                            <option value="a-z">Name: A - Z</option>
                            <option value="z-a">Name: Z - A</option>
                        </select>
                    </div>


                    <table className="w-full min-w-200 text-white">

                        <thead>

                            <tr className="border-b border-white/10 text-zinc-400">

                                <th className="text-left p-3">ID </th>

                                <th className="text-left p-3">Name</th>


                                <th className="text-left p-3">Email</th>


                                <th className="text-left p-3">Role</th>


                                <th className="text-left p-3">Orders</th>

                                <th className="text-left p-3">Actions</th>
                            </tr>

                        </thead>


                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id} className="border-b border-white/5 text-white">
                                        <td className="p-3">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.role}</td>
                                        <td className="p-3">{user.orders}</td>
                                        <td className="p-3">

                                            <button
                                                disabled={updateUserStatus.isPending}
                                                onClick={() => handleBlock(user)}
                                                className={`w-20 h-8 inline-flex items-center justify-center 
                                                    whitespace-nowrap rounded-md
                                                     text-white text-sm font-medium disabled:opacity-50 
                                                     ${user.isBlocked ? "bg-indigo-600 hover:bg-indigo-700"
                                                        : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                            >
                                                {user.isBlocked ? "Unblock" : "Block"}
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-6 text-center text-zinc-400">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="flex justify-end items-center gap-3 p-4 text-white">
                        <span className="mr-auto">
                            {debouncedSearch || filter ? `Matching users: ${totalUsers}` : `Total users: ${totalUsers}`}
                        </span>

                        <button
                            disabled={currentPage <= 1 || isFetching}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40">
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPage}
                        </span>

                        <button
                            disabled={currentPage >= totalPage || isFetching || totalPage === 0}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40">
                            Next
                        </button>
                    </div>
                </main>

            </div>

        </>
    )
}

export default AdminUsers;