import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function OrderSuccess() {

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location)
    const order = location.state?.order;


    return (
        <div className="min-h-screen bg-[#0B0B0F] text-white pt-24">

            <Header />

            <div className="max-w-3xl mx-auto px-5">

                <div className="bg-[#191A20] border border-white/10 rounded-2xl p-8 text-center">


                    <div className="text-6xl mb-5">
                        ✅
                    </div>


                    <h1 className="text-4xl font-bold mb-3">
                        Order Placed Successfully!
                    </h1>


                    <p className="text-zinc-400 mb-8">
                        Thank you for shopping with TechStore.
                    </p>



                    {
                        order && (

                            <div className="text-left bg-[#23242C] rounded-xl p-5 space-y-4">


                                <h2 className="text-xl font-semibold">
                                    Order Details
                                </h2>


                                <div className="border-b border-white/10 pb-3">

                                    <p>
                                        Payment Method:
                                        <span className="text-indigo-400 ml-2">
                                            {order.paymentMethod}
                                        </span>
                                    </p>


                                    <p>
                                        Total Amount:
                                        <span className="text-green-400 ml-2 font-semibold">
                                            ₹ {order.totalPrice}
                                        </span>
                                    </p>

                                </div>



                                <div>

                                    <h3 className="font-semibold mb-2">
                                        Delivery Address
                                    </h3>


                                    <p className="text-zinc-300">
                                        {order.address.name}
                                    </p>

                                    <p className="text-zinc-400">
                                        {order.address.street}, {order.address.city}
                                    </p>

                                    <p className="text-zinc-400">
                                        {order.address.state} - {order.address.zipCode}
                                    </p>

                                </div>



                                <div>

                                    <h3 className="font-semibold mb-2">
                                        Items
                                    </h3>


                                    {
                                        order.items.map((item) => (

                                            <div
                                                key={item.id}
                                                className="flex justify-between text-zinc-300"
                                            >

                                                <span>
                                                    {item.title} × {item.quantity}
                                                </span>

                                                <span>
                                                    ₹ {item.price * item.quantity}
                                                </span>

                                            </div>

                                        ))
                                    }

                                </div>


                            </div>

                        )
                    }



                    <button
                        onClick={() => navigate("/")}
                        className="
                        mt-8
                        w-full
                        bg-indigo-600
                        hover:bg-indigo-700
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        "
                    >
                        Continue Shopping
                    </button>



                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;