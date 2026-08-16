
import { BsHandbag } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { LuUsers } from "react-icons/lu";
import { FiPackage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";



function StatCard({users , allOrders , totalPrice , products }){
    const navigate = useNavigate()
    

    
    
   

    return (
        <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 place-items-center mt-10">
            <div className="max-w-55 max-h-30 p-4 bg-blue-700/30 backdrop-blur-md rounded-xl flex  cursor-pointer ">

                <div className="bg-blue-700 w-10 h-10 rounded-full flex justify-center 
                items-center m-3 ">
                    <BsHandbag className="text-white text-xl" />
                </div>

                <div className="mt-5 flex flex-col gap-2 "  onClick={()=>navigate("/Dashboard")}>

                    <h1 className="font-medium text-white">Total Revenue</h1>
                    <h1 className="font-bold text-2xl text-white ">${totalPrice}</h1>

                </div>

            </div>

            <div className="max-w-55 max-h-30 p-4 bg-blue-700/30 backdrop-blur-md rounded-xl flex cursor-pointer ">

                <div className="bg-blue-500 w-10 h-10 rounded-full flex justify-center 
                items-center m-3">
                    <TiShoppingCart className="text-white text-xl"/>
                </div>

                <div className="mt-5 flex flex-col gap-2"  onClick={()=>navigate("/Dashboard/Admin-orders")}>

                    <h1 className="font-medium text-white">Total Orders</h1>
                    <h1 className="font-bold text-2xl text-white">{allOrders.length || 0}</h1>

                </div>

            </div>

            <div className="max-w-55 max-h-30 p-4 bg-blue-700/30 backdrop-blur-md rounded-xl flex cursor-pointer ">

                <div className="bg-zinc-400 w-10 h-10 rounded-full flex justify-center
                 items-center m-5">
                    <LuUsers className="text-white text-xl" />
                </div>

                <div className="mt-5 flex flex-col gap-2" onClick={()=>navigate("/Dashboard/Admin-users")}>

                    <h1 className="font-medium text-white">Total Users</h1>
                    <h1 className="font-bold text-2xl text-white">{users.length || 0}</h1>

                </div>

            </div>

            <div className="max-w-55 max-h-30 p-4 bg-blue-700/30 backdrop-blur-md rounded-xl flex cursor-pointer ">

                <div className="bg-orange-700 w-10 h-10 rounded-full flex justify-center
                 items-center m-3  ">

                    <FiPackage className="text-xl text-white" />
                </div>

                <div className="mt-5 flex flex-col gap-2"  onClick={()=>navigate("/Dashboard/Admin-Products")}>

                    <h1 className="font-medium text-white">Total Products</h1>
                    <h1 className="font-bold text-2xl text-white">{products?.length || 0}</h1>

                </div>
            </div>
        </div>
        </>
    )
}

export default StatCard;