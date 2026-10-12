import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function OrderSuccess() {
const navigate = useNavigate();
const location = useLocation();
const order = location.state?.order;

const totalAmount = Number(
    order?.totalAmount ?? order?.totalPrice ?? 0
);

return (
    <div className="h-screen overflow-hidden bg-[#0B0B0F] text-white flex flex-col">
        <Header />

        <main className="flex-1 min-h-0 flex items-center justify-center px-4 py-3">
            <div className="w-full max-w-3xl max-h-full overflow-y-auto">
                <div className="bg-[#191A20] border border-white/10 rounded-2xl p-5 md:p-7 text-center">
                    <div className="text-4xl mb-2">
                        ✅
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Order Placed Successfully!
                    </h1>

                    <p className="text-sm text-zinc-400 mb-5">
                        Thank you for shopping with TechStore.
                    </p>

                    {order ? (
                        <div className="text-left bg-[#23242C] rounded-xl p-4 space-y-4">
                            <h2 className="text-lg font-semibold">
                                Order Details
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-white/10 pb-3 text-sm">
                                <p className="break-all">
                                    Order ID:{" "}
                                    <span className="text-indigo-400">
                                        {order._id ?? order.id ?? "N/A"}
                                    </span>
                                </p>

                                <p>
                                    Payment:{" "}
                                    <span className="text-indigo-400">
                                        {order.paymentMethod}
                                    </span>
                                </p>

                                <p>
                                    Status:{" "}
                                    <span className="text-indigo-400 capitalize">
                                        {order.status ?? "pending"}
                                    </span>
                                </p>

                                <p>
                                    Total:{" "}
                                    <span className="text-green-400 font-semibold">
                                        ₹{totalAmount.toFixed(2)}
                                    </span>
                                </p>
                            </div>

                            {order.address && (
                                <div className="text-sm">
                                    <h3 className="font-semibold mb-1">
                                        Delivery Address
                                    </h3>

                                    <p className="text-zinc-300">
                                        {order.address.name}
                                        {" · "}
                                        {order.address.phone}
                                    </p>

                                    <p className="text-zinc-400">
                                        {order.address.street},{" "}
                                        {order.address.city},{" "}
                                        {order.address.state} -{" "}
                                        {order.address.zipCode}
                                    </p>
                                </div>
                            )}

                            <div className="text-sm">
                                <h3 className="font-semibold mb-2">
                                    Items
                                </h3>

                                <div className="space-y-2">
                                    {(order.items ?? []).map((item, index) => {
                                        const product =
                                            item.product ?? item;

                                        const quantity =
                                            Number(item.quantity) || 0;

                                        const price =
                                            Number(item.price ?? product.price) || 0;

                                        return (
                                            <div
                                                key={item._id ?? product._id ?? index}
                                                className="flex justify-between gap-3 text-zinc-300"
                                            >
                                                <span className="min-w-0 break-words">
                                                    {product.title ?? "Product"}{" "}
                                                    × {quantity}
                                                </span>

                                                <span className="shrink-0">
                                                    ₹{(
                                                        price * quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-zinc-400 text-sm">
                            Order details are unavailable on this page.
                            Please check your order history.
                        </p>
                    )}

                    <button
                        onClick={() => navigate("/")}
                        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-xl font-semibold transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </main>
    </div>
);


}

export default OrderSuccess;
