
import icon from "/shopping-bag.svg";
import { FaUsers } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { TiShoppingCart } from "react-icons/ti";
import { RxDashboard } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useGetUsers from "../../hooks/Admin/useGetUsers";

function SideBar() {
    
const navigate = useNavigate()
    

    

    function removeUser(e){
        localStorage.removeItem("userId")
        localStorage.removeItem("user")

        navigate("/login")
    }

    

    return (
        <>
            <aside className="fixed top-0 left-0 z-50 h-screen w-64
            border-r-2 border-white/10  bg-[#0F1420] flex flex-col">
                <div className="flex justify-center items-center py-7 px-3">
                    <img src={icon} className="w-12 h-12" />
                    <h1 onClick={()=>navigate("/Dashboard")} className="text-white text-3xl font-bold">Tech<span className="text-indigo-400">Store</span></h1>
                </div>

                <div className="flex py-4 pb-10 gap-10  px-8 items-start flex-col  text-white border-white/10 border-b-2">

                    <div className="flex gap-2 cursor-pointer" onClick={()=>navigate("/Dashboard")} >
                        <RxDashboard className="text-2xl" />
                        <h1>DashBoard</h1>

                    </div>
                    <div className="flex gap-2 cursor-pointer" onClick={()=>navigate("/Dashboard/Admin-users")}>
                        <FaUsers className="text-2xl" />
                        <h1>Users</h1>

                    </div>
                    <div className="flex gap-2 cursor-pointer" onClick={()=>navigate("/Dashboard/Admin-products")}>
                        <LuPackage className="text-2xl" />
                        <h1>Products</h1>

                    </div>
                    <div className="flex gap-2 cursor-pointer" onClick={()=>navigate("/Dashboard/Admin-orders")}>
                        <TiShoppingCart className="text-2xl" />
                        <h1>Orders</h1>

                    </div>

                </div>

                <div className="flex gap-2 text-white px-8 py-4 cursor-pointer" onClick={removeUser}>
                    <MdLogout className="text-2xl text-red-400 " />
                    <h1>Logout</h1>
                </div>
            </aside>
        </>
    )
}

export default SideBar