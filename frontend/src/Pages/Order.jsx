import Header from "../Components/Header";
import useGetOrders from "../hooks/useGetOrders";


function Orders() {

    const userId = localStorage.getItem("userId");

    const { data: orders = [],  isLoading,  error } = useGetOrders(userId);



    if (isLoading) {
        return (
            <h1 className="text-white text-center mt-20">
                Loading orders...
            </h1>
        );
    }


    if (error) {
        return (
            <h1 className="text-red-500 text-center mt-20">
                Something went wrong
            </h1>
        );
    }



    return (

        <div className="min-h-screen bg-[#0B0B0F] text-white pt-24">

            <Header />


            <div className="max-w-6xl mx-auto px-5">


                <h1 className="text-4xl font-bold mb-10">
                    My Orders
                </h1>



                {
                    orders.length === 0 ? (

                        <div className="text-center text-zinc-400">
                            No orders found
                        </div>

                    ) : (


                        <div className="space-y-6">


                            {
                                orders.map((order) => (

                                    <div
                                        key={order.id}
                                        className="
                                        bg-[#191A20]
                                        border border-white/10
                                        rounded-2xl
                                        p-6
                                        "
                                    >


                                        <div className="flex justify-between mb-5">




                                            <span className="text-yellow-400">
                                                {order?.status}
                                            </span>


                                        </div>




                                        <div className="space-y-4">


                                            {
                                                order.items.map((item) => (

                                                    <div
                                                        key={item.id}
                                                        className="flex gap-4"
                                                    >


                                                        <img
                                                            src={item.thumbnail}
                                                            alt={item.title}
                                                            className="
                                                            w-20
                                                            h-20
                                                            rounded-lg
                                                            object-cover
                                                            "
                                                        />



                                                        <div>

                                                            <h3 className="font-semibold">
                                                                {item.title}
                                                            </h3>


                                                            <p className="text-zinc-400">
                                                                Quantity: {item.quantity}
                                                            </p>


                                                            <p className="text-indigo-400">
                                                                ₹ {item.price * item.quantity}
                                                            </p>


                                                        </div>


                                                    </div>

                                                ))
                                            }


                                        </div>





                                        <div className="
                                        border-t
                                        border-white/10
                                        mt-6
                                        pt-5
                                        space-y-2
                                        ">


                                            <p>
                                                Payment:
                                                <span className="text-indigo-400 ml-2">
                                                    {order.paymentMethod}
                                                </span>
                                            </p>



                                            <p className="text-xl font-bold">
                                                Total:
                                                <span className="text-green-400 ml-2">
                                                    ₹ {order.totalPrice}
                                                </span>
                                            </p>



                                            <p className="text-zinc-400">
                                                Delivered To:
                                            </p>


                                            <p>
                                                {order.address.street},
                                                {" "}
                                                {order.address.city}
                                            </p>


                                        </div>



                                    </div>

                                ))
                            }


                        </div>

                    )
                }


            </div>


        </div>

    );
}


export default Orders;