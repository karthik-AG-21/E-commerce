import Header from "../Components/Header";
import useGetOrders from "../hooks/useGetOrders";

function Orders() {
    const userId = localStorage.getItem("userId");

    const {
        data: orders = [],
        isLoading,
        error,
    } = useGetOrders(userId);

    if (isLoading) {
        return (
            <>
                <Header />
                <h1 className="text-white text-center mt-20">
                    Loading orders...
                </h1>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <h1 className="text-red-500 text-center mt-20">
                    Something went wrong
                </h1>
            </>
        );
    }

    if (!Array.isArray(orders) || orders.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-[#0B0B0F] text-white pt-24">
                    <p className="text-center text-zinc-400">
                        No orders found.
                    </p>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-white pt-24">
            <Header />

            <div className="max-w-6xl mx-auto px-5 pb-10">
                <h1 className="text-4xl font-bold mb-10">
                    My Orders
                </h1>

                <div className="space-y-6">
                    {orders.map((order) => {
                        const orderTotal = Number(
                            order.totalAmount ??
                            order.totalPrice ??
                            order.items?.reduce(
                                (total, item) =>
                                    total +
                                    Number(
                                        item.price ??
                                        item.product?.price ??
                                        0
                                    ) * Number(item.quantity ?? 0),
                                0
                            ) ??
                            0
                        );

                        return (
                            <div
                                key={order._id || order.id}
                                className="bg-[#191A20] border border-white/10 rounded-2xl p-6"
                            >
                                {/* Order status */}
                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-yellow-400 capitalize">
                                        {order.status || "pending"}
                                    </span>

                                    <span className="text-xs text-zinc-500">
                                        Order ID: {order._id || order.id}
                                    </span>
                                </div>

                                {/* Order items */}
                                <div className="space-y-4">
                                    {order.items?.map((item) => {
                                        const product = item.product ?? item;

                                        const price = Number(
                                            item.price ??
                                            product.price ??
                                            0
                                        );

                                        const quantity = Number(
                                            item.quantity ?? 0
                                        );

                                        const image =
                                            product.images?.[0] ||
                                            product.thumbnail ||
                                            item.thumbnail ||
                                            "";

                                        return (
                                            <div
                                                key={
                                                    item._id ||
                                                    product._id ||
                                                    product.id
                                                }
                                                className="flex gap-4 items-center border-b border-white/5 pb-4"
                                            >
                                                {/* Product image */}
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={
                                                            product.title ||
                                                            "Product"
                                                        }
                                                        className="w-20 h-20 rounded-lg object-contain bg-white p-1"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                                                        No image
                                                    </div>
                                                )}

                                                {/* Product details */}
                                                <div className="flex-1">
                                                    <h3 className="font-semibold">
                                                        {product.title ||
                                                            "Product unavailable"}
                                                    </h3>

                                                    <p className="text-zinc-400 text-sm">
                                                        Quantity: {quantity}
                                                    </p>

                                                    <p className="text-indigo-400">
                                                        ₹{price.toFixed(2)}
                                                    </p>

                                                    <p className="text-zinc-300 text-sm">
                                                        Subtotal: ₹
                                                        {(
                                                            price * quantity
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order information */}
                                <div className="border-t border-white/10 mt-6 pt-5 space-y-3">
                                    <p>
                                        Payment:
                                        <span className="text-indigo-400 ml-2">
                                            {order.paymentMethod || "N/A"}
                                        </span>
                                    </p>

                                    <p>
                                        Payment status:
                                        <span className="text-yellow-400 ml-2 capitalize">
                                            {order.paymentStatus || "pending"}
                                        </span>
                                    </p>

                                    <p className="text-xl font-bold">
                                        Total:
                                        <span className="text-green-400 ml-2">
                                            ₹{orderTotal.toFixed(2)}
                                        </span>
                                    </p>

                                    <div>
                                        <p className="text-zinc-400">
                                            Delivered To:
                                        </p>

                                        <p>
                                            {[
                                                order.address?.street,
                                                order.address?.city,
                                                order.address?.state,
                                                order.address?.zipCode,
                                            ]
                                                .filter(Boolean)
                                                .join(", ") || "Address unavailable"}
                                        </p>

                                        {order.address?.name && (
                                            <p className="text-sm text-zinc-400 mt-1">
                                                {order.address.name}
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-xs text-zinc-500">
                                        Ordered on:{" "}
                                        {order.createdAt
                                            ? new Date(
                                                order.createdAt
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Orders;