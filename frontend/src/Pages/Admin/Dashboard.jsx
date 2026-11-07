
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import CategoryChart from "../../Components/Admin/CategoryChart";
import RevenueChart from "../../Components/Admin/RevenueChart";
import StatCard from "../../Components/Admin/StatCard";
import { PageError, PageLoader } from "../../Components/PageStatus";
import useGetAllOrders from "../../hooks/Admin/useGetAllOrders";
import useGetAllProducts from "../../hooks/Admin/useGetAllProducts";
import useGetUsers from "../../hooks/Admin/useGetUsers";
// import { PageLoader, PageError } from "../components/PageStatus";

function Dashboard() {
    const limit = 1000;

    const {
        data: users,
        isLoading,
        isFetching,
        error,
    } = useGetUsers({ limit });

    const {
        data: products,
        isLoading: prodIsLoading,
        isFetching:prodIsFetching,
        error: prodError,
    } = useGetAllProducts({ limit });

    const {
        data: orders,
        isLoading: orderIsLoading,
        isFetching:orderIsFetching,
        error: orderError,
    } = useGetAllOrders({ limit });

    const allOrders = orders?.data || [];

    const totalPrice = Math.ceil(
        allOrders.reduce(
            (sum, order) =>
                sum + Number(order?.totalAmount || 0),
            0
        )
    );

    if (isFetching || prodIsFetching || orderIsFetching || isLoading || prodIsLoading || orderIsLoading) {
        return <PageLoader message="Loading dashboard..." />;
    }

    if (error || prodError || orderError) {
        return <PageError message="Failed to load dashboard data. Please try again." />;
    }

    return (
        <div className="min-h-screen w-full overflow-x-clip bg-[#0F1420] text-white">
            <SideBar />

            <main
                className="
                    min-h-screen min-w-0 w-full
                    px-0
                    md:ml-64 md:w-[calc(100%-16rem)]
                "
            >
                <Header
                    page="Dashboard"
                    content="Welcome back, "
                    role=" Admin"
                />

                <section className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
                    <StatCard
                        users={users?.data}
                        allOrders={allOrders}
                        totalPrice={totalPrice}
                        products={products}
                    />
                </section>

                <section
                    className="
                        grid w-full min-w-0
                        grid-cols-1 gap-4
                        px-3 pb-5
                        sm:gap-5 sm:px-5
                        lg:grid-cols-3 lg:px-6
                    "
                >
                    <div className="min-w-0 lg:col-span-2">
                        <div className="h-full min-w-0 overflow-hidden rounded-xl">
                            <RevenueChart allOrders={allOrders} />
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="h-full min-w-0 overflow-hidden rounded-xl">
                            <CategoryChart products={products} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
