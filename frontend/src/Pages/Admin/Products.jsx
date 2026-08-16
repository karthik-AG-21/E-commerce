import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import useMobiles from "../../hooks/useMobiles";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import { FaHandLizard } from "react-icons/fa";

function AdminProducts() {

    const { data: products = [], prodIsLoading, prodError } = useMobiles();

    const [search, setSearch] = useState("")

    const [filter, setFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);




    if (prodIsLoading) {
        return <h1>Loading...</h1>;
    }

    if (prodError) {
        return <h1>Something went wrong...</h1>;
    }

    console.log("stock:", products?.[0]?.stock);


    const filterData = products.filter((item) => item?.title.toLowerCase().includes(search.toLowerCase()))




    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function handleFilter(e) {
        setFilter(e.target.value)
        console.log(e.target.value)
    }

    const filteredProducts = [...filterData];

    if (filter === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (filter === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }



    if (filter === "stock") {
        filteredProducts.sort((a, b) => b.stock - a.stock);
    }
    if (filter === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    //pagination

    const itemsPerPage = 8;

    const totalPage = Math.ceil(filteredProducts.length / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const lastIndex = startIndex + itemsPerPage

    const currentProducts = filteredProducts.slice(startIndex, lastIndex)


    return (
        <div className="flex w-full bg-indigo-900">

            <SideBar />

            <main className="ml-64  bg-[#0F1420] h-screen w-full">

                <Header page="products" content="Dashboard/Products" />


                <div className=" overflow-x-auto">
                    <div className="flex justify-end pr-5 gap-3 border-b-2 border-white/10 py-2">

                        <div className="flex  gap-3  items-center">
                            <div>
                                <input type="search" placeholder="Search Products ..." name="search"
                                    className="py-1 px-1 text-white  rounded border-2 border-white/20"
                                    value={search}
                                    onChange={handleSearch} />
                            </div>

                            <div className="relative flex items-center">
                                <CiFilter className="absolute left-3 z-10 text-white" />

                                <select className="pl-9 pr-4 py-2 border rounded-md text-white bg-[#0F1420]"
                                    value={filter} onChange={handleFilter} >
                                    <option value="">Filter</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                    <option value="rating">Rating: Higher</option>
                                    <option value="stock">Stock</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button className="bg-white  text-zinc-700 font-bold text-sm px-3 py-2 rounded hover:bg-indigo-600 hover:text-white">+ Add Products</button>
                        </div>
                    </div>

                    <table className="w-full min-w-200 text-white">

                        <thead>

                            <tr className="border-b border-white/10 text-zinc-400">

                                <th className="text-left p-3">ID </th>

                                <th className="text-left p-3">Product</th>


                                <th className="text-left p-3">Category</th>


                                <th className="text-left p-3">Price</th>


                                <th className="text-left p-3">Stock</th>


                                <th className="text-left p-3">Rating</th>

                                <th className="text-left p-3">Actions</th>




                            </tr>

                        </thead>


                        <tbody>

                            {currentProducts.map((item, index) => (

                                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">

                                    <td className="p-3">{startIndex + index + 1}</td>


                                    <td className="">

                                        <div className="flex items-center gap-3  ">

                                            <img src={item.thumbnail || item.images?.[0]}
                                                alt={item.title} className="w-10 h-10 object-contain bg-white rounded" />

                                            <span> {item.title}</span>



                                        </div>

                                    </td>


                                    <td className="p-3 capitalize">
                                        {item.category.replace("-", " ")}
                                    </td>


                                    <td className="p-3">
                                        ${item.price}
                                    </td>


                                    <td className="p-3">
                                        <span className={item.stock <= 10 ? "text-red-400" : "text-green-400"} >{item.stock} </span>
                                    </td>


                                    <td className="p-3">⭐ {item.rating}</td>

                                    <td className="p-3 flex gap-4  items-center">
                                        <div >
                                            <MdOutlineModeEdit />
                                        </div>
                                        <div>
                                            <RiDeleteBin6Line />
                                        </div>
                                    </td>


                                    {/* <td className="p-3"><button >Delete</button> </td> */}

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

                </div>

            </main>

        </div>
    );
}

export default AdminProducts;