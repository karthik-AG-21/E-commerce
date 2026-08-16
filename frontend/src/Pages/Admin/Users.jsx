import { CiFilter } from "react-icons/ci";
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import useGetUsers from "../../hooks/Admin/useGetUsers";
import { useState } from "react";
import useUpdateUserStatus from "../../hooks/Admin/useUpdateUserStatus";


function AdminUsers() {

    const { data, isLoading, error } = useGetUsers();
    const [search, setSearch] = useState("")

    const updateUserStatus = useUpdateUserStatus();

    const [currentPage, setCurrentPage] = useState(1);

    const [filter, setFilter] = useState("")

    if (isLoading) {
        return <h1>loading...</h1>
    }

    if (error) {
        return <h1>somthing is wrong</h1>
    }

    console.log(data)



    let filterData = data.filter((item) => item.role !== "admin").filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()));

    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function handleFilter(e) {

        setFilter(e.target.value)
    }

    let filteredUsers = [...filterData];


    if (filter === "active") {
        filteredUsers = filteredUsers.filter(user => !user.isBlocked);
    }

    if (filter === "inactive") {
        filteredUsers = filteredUsers.filter(user => user.isBlocked);
    }


    if (filter === "a-z") {
        filteredUsers.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (filter === "z-a") {
        filteredUsers.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    if (filter === "newest-users") {
        console.log(filteredUsers[0].createdAt, "the date")
        filteredUsers.sort((a, b) => b.createdAt - a.createdAt);
        console.log(filteredUsers)
    }

    if (filter === "oldest-users") {
        filteredUsers.sort((a, b) => a.createdAt - b.createdAt);
    }

    console.log(filter)


    const itemsPerPage = 8;

    const totalPage = Math.ceil(filteredUsers.length / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage;

    const lastIndex = startIndex + itemsPerPage;

    const currentUsers = filteredUsers.slice(startIndex, lastIndex)


    function handleBlock(user) {
        updateUserStatus.mutate({
            userId: user.id,
            status: !user.isBlocked,
        });
    }



    return (
        <>
            <div className="flex w-full bg-indigo-900">
                <SideBar />

                <main className="ml-64  bg-[#0F1420] w-full min-h-screen" >

                    <Header page={"Users"} content={"Dashboard/Users"} />
                    <div className="flex justify-end gap-3 border-b-2 border-white/10 py-2 pr-2">

                        <div className="flex  gap-3  items-center">
                            <div>
                                <input type="search" placeholder="Search Products ..." name="search"
                                    className="py-1 px-1 text-white  rounded border-2 border-white/20"
                                    onChange={handleSearch} />
                            </div>

                            <div className="relative flex items-center">
                                <CiFilter className="absolute left-3 z-10 text-white" />

                                <select className="pl-9 pr-4 py-2 border rounded-md text-white  bg-[#0F1420]"
                                    value={filter || "all"} onChange={handleFilter}>
                                    <option value="">Sort /Filter</option>
                                    <option value="a-z">Name : A - Z </option>
                                    <option value="z-a">Name : Z - A </option>
                                    <option value="newest-users">Newest Users</option>
                                    <option value="oldest-users">Oldest Users</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">inactive</option>
                                </select>
                            </div>
                        </div>

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
                            {currentUsers.map((item, index) => (
                                <>
                                    <tr key={item.id} className=" border-b border-white/5 hover:bg-white/5">
                                        <td className="p-3 ">{startIndex + index + 1}</td>
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3">{item.email}</td>
                                        <td className="p-3">{item.role}</td>
                                        <td className="p-3 ">{item.orders.length}</td>
                                        <td className="p-3">
                                            <button className="bg-red-600 py-2 px-4 rounded w-24" 
                                            onClick={() => handleBlock(item)}
                                                disabled={updateUserStatus.isPending}>
                                                {item.isBlocked ? "Unblock" : "Block"}
                                            </button>

                                        </td>

                                    </tr>
                                </>

                            )


                            )}
                        </tbody>
                    </table>

                    <div className="flex justify-end items-center gap-3 p-4 text-white">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPage}
                        </span>

                        <button
                            disabled={currentPage === totalPage}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </main>

            </div>

        </>
    )
}

export default AdminUsers;