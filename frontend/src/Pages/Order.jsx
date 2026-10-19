import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import useGetOrders from "../hooks/useGetOrders";

function Orders() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const limit = 5;

    // Debounce: wait 300ms after the user stops typing.
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const {
        data: response,
        isLoading,
        isFetching,
        error,
    } = useGetOrders(userId, page, limit, debouncedSearch);

    // Backend response:
    // { success, count, data: [...orders], pagination: {...} }
    const orders = response?.data ?? [];
    const pagination = response?.pagination;

    const totalPages = pagination?.totalPages ?? 0;
    const totalOrders = pagination?.totalOrders ?? 0;

    if (!userId) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] text-white">
                <Header />

                <div className="pt-32 text-center">
                    <p className="text-zinc-400 mb-4">
                        Please log in to view your orders.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] text-white">
                <Header />

                <p className="text-center pt-32 text-zinc-400">
                    Loading orders...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] text-white">
                <Header />

                <p className="text-center pt-32 text-red-400">
                    Failed to load orders.
                </p>

                <div className="text-center mt-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 px-5 py-2 rounded-xl"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-white pt-24">
            <Header />

            <main className="max-w-6xl mx-auto px-5 pb-10">
                {/* Heading */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        My Orders
                    </h1>

                    <p className="text-sm text-zinc-400">
                        Total orders: {totalOrders}
                    </p>
                </div>

                {/* Product Name Search */}
                <div className="flex gap-3 mb-6">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search orders by product name..."
                        aria-label="Search orders by product name"
                        className="w-full bg-[#191A20] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500 transition"
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Fetching Indicator */}
                {isFetching && (
                    <p className="text-sm text-zinc-500 mb-4">
                        Updating orders...
                    </p>
                )}

                {/* Empty State */}
                {orders.length === 0 ? (
                    <div className="text-center py-16 bg-[#191A20] rounded-2xl border border-white/10">
                        <p className="text-zinc-400 mb-4">
                            {debouncedSearch
                                ? `No orders found for "${debouncedSearch}".`
                                : "No orders found."}
                        </p>

                        {debouncedSearch ? (
                            <button
                                onClick={() => setSearch("")}
                                className="text-indigo-400 hover:text-indigo-300"
                            >
                                Clear search
                            </button>
                        ) : (
                            page > 1 ? (
                                <button
                                    onClick={() => setPage((p) => p - 1)}
                                    className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl"
                                >
                                    Go to previous page
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/products")}
                                    className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl"
                                >
                                    Browse Products
                                </button>
                            )
                        )}
                    </div>
                ) : (
                    <>
                        {/* Order Cards */}
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
                                        className="bg-[#191A20] border border-white/10 rounded-2xl p-5 md:p-6"
                                    >
                                        {/* Order Status */}
                                        <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                                            <span className="text-yellow-400 capitalize">
                                                {order.status || "pending"}
                                            </span>

                                            <span className="text-xs text-zinc-500 break-all">
                                                Order ID: {order._id || order.id}
                                            </span>
                                        </div>

                                        {/* Products */}
                                        <div className="space-y-4">
                                            {order.items?.map((item, index) => {
                                                const product =
                                                    item.product &&
                                                        typeof item.product === "object"
                                                        ? item.product
                                                        : {};

                                                const price = Number(
                                                    item.price ??
                                                    product.price ??
                                                    0
                                                );

                                                const quantity = Number(
                                                    item.quantity ?? 0
                                                );

                                                const productName =
                                                    item.title ??
                                                    product.title ??
                                                    "Product unavailable";

                                                const image =
                                                    product.images?.[0] ||
                                                    product.thumbnail ||
                                                    "";

                                                return (
                                                    <div
                                                        key={item._id || index}
                                                        className="flex gap-4 items-center border-b border-white/5 pb-4"
                                                    >
                                                        {image ? (
                                                            <img
                                                                src={image}
                                                                alt={productName}
                                                                className="w-20 h-20 shrink-0 rounded-lg object-contain bg-white p-1"
                                                                onError={(e) => {
                                                                    e.currentTarget.style.display =
                                                                        "none";
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-20 h-20 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                                                                No image
                                                            </div>
                                                        )}

                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-semibold break-words">
                                                                {productName}
                                                            </h3>

                                                            <p className="text-zinc-400 text-sm">
                                                                Quantity: {quantity}
                                                            </p>

                                                            <p className="text-indigo-400">
                                                                ₹{price.toFixed(2)}
                                                            </p>

                                                            <p className="text-zinc-300 text-sm">
                                                                Subtotal: ₹
                                                                {(price * quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Order Information */}
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
                                                        .join(", ") ||
                                                        "Address unavailable"}
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

                        {/* Pagination */}
                        {totalPages > 0 && (
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                                <button
                                    onClick={() => setPage((p) => p - 1)}
                                    disabled={
                                        page <= 1 ||
                                        isFetching ||
                                        !pagination?.hasPrevPage
                                    }
                                    className="px-5 py-2 rounded-xl border border-white/10 bg-[#191A20] hover:bg-[#23242C] disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Previous
                                </button>

                                <span className="text-sm text-zinc-300">
                                    Page {pagination?.currentPage ?? page} of{" "}
                                    {totalPages}
                                </span>

                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={
                                        page >= totalPages ||
                                        isFetching ||
                                        !pagination?.hasNextPage
                                    }
                                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

    export default Orders;