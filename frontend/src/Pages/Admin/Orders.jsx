import { CiFilter } from "react-icons/ci";
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import useGetUsers from "../../hooks/Admin/useGetUsers";
import { useState } from "react";
import useUpdateOrderStatus from "../../hooks/Admin/useUpdateOrderStatus";



function AdminOrders() {

    const { data, isLoading, error } = useGetUsers()

    const updateStatus = useUpdateOrderStatus()

    const [search, setSearch] = useState("")
    const [filter , setFilter] = useState("")
    const [currentPage , setCurrentPage] = useState(1)

    if (isLoading) {
        return <h1>loading ... </h1>
    }

    if (error) {
        return <h1>error</h1>
    }

   

    // const allOrders = data.map((item) => item?.orders).flat()

    const allOrders = data.flatMap((user) =>(user.orders || []).map((order) => ({...order,userId: user.id,})));

    console.log(allOrders[0]?.userId)

    function handleSearch(e) {
        setSearch(e.target.value)
        setCurrentPage(1);
    }

    const filterData = allOrders.filter((item) => item?.address?.name?.toLowerCase().includes(search.toLowerCase()) 
    ||  item?.id?.toString().toLowerCase().includes(search.toLowerCase()))

    function handleFilter(e){
        setFilter(e.target.value)
        setCurrentPage(1);
    }

    let filteredOrders = [...filterData];

    if(filter == "newest"){

        console.log("check",filteredOrders)
        filteredOrders.sort((a,b)=> new Date(b.orderedAt) - new Date(a.orderedAt))
    }

    if(filter == "oldest"){
        filteredOrders.sort((a,b)=> new Date(a.orderedAt) - new Date(b.orderedAt))
    }
    if(filter == "low-high"){
        filteredOrders.sort((a,b)=> a.totalPrice - b.totalPrice)
    }
    if(filter == "high-low"){
        filteredOrders.sort((a,b)=> b.totalPrice - a.totalPrice)
    }

    function handleStatusChange(userId, orderId, value){
        updateStatus.mutate({userId:userId, orderId:orderId, status:value})
    }

    const itemsPerPage = 8;

    const totalPage = Math.ceil(filteredOrders.length/itemsPerPage)

    const startIndex = (currentPage - 1 )*itemsPerPage
    const lastIndex = startIndex+itemsPerPage

    const currentOrders =  filteredOrders.slice(startIndex , lastIndex)
    

    return (
        <>

            <div className="flex w-full bg-indigo-900">
                <SideBar />

                <main className="ml-64  bg-[#0F1420] min-h-screen  w-full" >
                    <Header page={"Orders"} content={"Dashboard/Orders"} />
                    <div className="flex justify-end gap-3 border-b-2 border-white/10 py-2 pr-4">

                        <div className="flex  gap-3  items-center">
                            <div>
                                <input type="search" placeholder="Search Products ..." name="search"
                                    className="py-1 px-1 text-white  rounded border-2 border-white/20"
                                    value={search} onChange={handleSearch} />
                            </div>

                            <div className="relative flex items-center">
                                <CiFilter className="absolute left-3 z-10 text-white" />

                                <select className="pl-9 pr-4 py-2 border rounded-md text-white  bg-[#0F1420]"
                                value={filter} onChange={handleFilter}>
                                    <option value="">All Dates</option>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <table className="w-full text-white">
                        <thead>
                            <tr className="border-b border-white/10 py-2 text-zinc-400">

                                <th className="text-left p-4">No</th>
                                <th className="text-left p-4">Order id</th>

                                <th className="text-left p-4">customer</th>
                                <th className="text-left p-4">Date</th>
                                <th className="text-left p-4">Amount</th>
                                <th className="text-left p-4">Payment Method</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders?.map((item, index) => (
                                <tr key={item?.id} className="border-b border-white/10 py-2 text-zinc-200">
                                    <td className="text-left p-3">{startIndex+index + 1}</td>

                                    <td className="text-left  p-3">{item.id}</td>

                                    <td className="text-left  p-3">{item?.address?.name}</td>

                                    <td className="text-left p-3">{new Date(item?.orderedAt).toLocaleDateString("en-IN", {
                                        day: "2-digit", month: "short", year: "numeric",
                                    })}</td>
                                    <td className="text-left p-3">${item?.totalPrice}</td>

                                    <td className="text-left p-3 pl-12">{item?.paymentMethod}</td>

                                    <td className="text-left p-3">{item?.status}</td>
                                    <td className="text-left p-3">
                                        <select
                                            value={item?.status}
                                            onChange={(e) => handleStatusChange(item.userId, item.id ,e.target.value)}
                                            className=" bg-[#0F1420] text-white border
                                             border-white/10 rounded-lg px-3 py-2">
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>

                            ))}

                        </tbody>
                    </table>

                    <div className="flex justify-end items-center gap-3 p-4 text-white">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40">
                            Previous
                        </button>

                        <span> Page {currentPage} of {totalPage}</span>

                        <button
                            disabled={currentPage === totalPage}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40">
                            Next
                        </button>
                    </div>
                </main>

            </div>



        </>
    )
}

export default AdminOrders;