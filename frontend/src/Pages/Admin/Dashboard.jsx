
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import CategoryChart from "../../Components/Admin/CategoryChart";
import RevenueChart from "../../Components/Admin/RevenueChart";
import StatCard from "../../Components/Admin/StatCard";
import useGetUsers from "../../hooks/Admin/useGetUsers";
import useMobiles from "../../hooks/useMobiles";



function Dashboard() {

    const { data : users , isLoading , error } = useGetUsers();
    const { data : products , isLoading : prodIsLoading , error : prodError } = useMobiles()

    if(isLoading){
        return <h1>loading..</h1>
    }

    if(error){
        return <h1>error</h1>
    }

    if(prodIsLoading){
        return <h1>loading..</h1>
    }

    if(prodError){
        return <h1>error</h1>
    }

    const allOrders = users.flatMap((user) => user.orders || []);

    const totalPrice = Math.ceil(allOrders.reduce((sum , item)=>sum+=item.totalPrice,0))
    

    console.log(totalPrice)
    


    return (
        <>
            <div className=" flex w-full bg-[#0F1420]">

                <SideBar />

                <main className="min-h-screen ml-64  bg-[#0F1420] w-full" >

                    <Header page={"Dashboard"} content={"Wellcome back, "} role={" Admin"} />

                    <StatCard users={users} allOrders={allOrders}  totalPrice={totalPrice} products={products}/>
                    <div className="flex gap-5 w-full p-5">

                        <div className="w-2/3">
                            <RevenueChart allOrders={allOrders} />
                        </div>

                        <div className="w-1/3">
                            <CategoryChart products={products}/>
                        </div>

                    </div>

                    


                </main>
            </div>
        </>
    )
}
export default Dashboard;

