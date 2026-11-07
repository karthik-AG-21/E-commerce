
import { useDispatch, } from "react-redux";
import { removeCart, setCart } from "../redux/cartSlice";
import useUpdateCart from "../hooks/Cart/useUpdateCart";
import useGetCart from "../hooks/useGetCart";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { PageError, PageLoader } from "../Components/PageStatus";


function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = localStorage.getItem("userId");

    const [page, setPage] = useState(1);
    const limit = 5;

    const { data: cart, isLoading, isFetching ,isError, refetch, } = useGetCart(user, page, limit);

    const { data: allCart, isLoading: isTotalLoading } = useGetCart(user, 1, 10000);

    const { mutateAsync, isPending } = useUpdateCart();

    const products = cart?.items ?? [];
    const pagination = cart?.pagination;

    useEffect(() => {
        if (Array.isArray(cart?.items)) {
            dispatch(setCart(cart.items));
        }
    }, [cart?.items, dispatch]);



    // Remove a product from the cart.

    const handleRemove = async (item) => {
        const product = item.product ?? item;

        try {
            await mutateAsync({
                type: "remove",
                productId: product._id,
            });

            dispatch(removeCart(item));

            // If the last item on this page was removed,
            // navigate to the previous page.
            if (products.length === 1 && page > 1) {
                setPage((prev) => prev - 1);
            }
        } catch (error) {
            console.error(
                "Failed to remove product:",
                error.response?.data ?? error.message
            );
        }
    };


    // Update quantity will be connected to a PATCH API next.
    const handleQuantityChange = async (item, change) => {
        const product = item.product ?? item;
        const newQuantity = item.quantity + change;

        if (newQuantity < 1) return;

        try {
            await mutateAsync({
                type: "update",
                productId: product._id,
                quantity: newQuantity,
            });
        } catch (error) {
            console.error(
                "Failed to update quantity:",
                error.response?.data ?? error.message
            );
        }
    };

    if (isLoading) {
    return <PageLoader message="Loading your cart..." />;
}

if (isError) {
    return (
        <PageError
            message="Failed to load your cart."
            onRetry={refetch}
        />
    );
}

    const allProducts = allCart?.items ?? [];

    const totalPrice = allProducts.reduce((total, item) => {
        const product = item.product ?? item;

        const price = Number(product.price) || 0;
        const discount = Number(product.discountPercentage) || 0;

        const discountedPrice = Math.ceil(
            price - (price * discount) / 100
        );

        return total + discountedPrice * item.quantity;
    }, 0);

    return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#0B0B0F] px-4 pt-24 sm:px-5">
        <Header />

        <main className="mx-auto max-w-6xl py-8">
            {/* Page Heading */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    My Cart
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                    Review your items before checkout.
                </p>
            </div>

            {isFetching && cart && (
                <p className="py-2 text-center text-sm text-gray-400">
                    Updating cart...
                </p>
            )}

            {products.length === 0 ? (
                /* Empty Cart */
                <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                    <div className="mb-5 text-6xl">🛒</div>

                    <h2 className="text-2xl font-bold text-white">
                        Your cart is empty
                    </h2>

                    <p className="mt-3 max-w-sm text-gray-400">
                        Looks like you haven't added anything to your cart yet.
                        Start exploring and find something you love!
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                        {/* Cart items */}
                        <div className="flex-1 flex flex-col gap-5">
                            {products.map((item) => {
                                const product = item.product ?? item;

                                const price = Number(product.price) || 0;
                                const discount =
                                    Number(product.discountPercentage) || 0;

                                const discountedPrice = Math.ceil(
                                    price - (price * discount) / 100
                                );

                                const rowTotal = discountedPrice * item.quantity;

                                return (
                                    <div
                                        key={product._id}
                                        className="bg-[#191A20] text-white rounded-lg p-5 flex flex-col md:flex-row items-center gap-6 shadow-md"
                                    >
                                        <img
                                            src={
                                                product?.thumbnail?.url ||
                                                product?.thumbnail ||
                                                product?.images?.[0] ||
                                                product?.images?.[1] ||
                                                product?.images?.[2] ||
                                                ""
                                            }
                                            alt={product?.title || "Product"}
                                            className="w-32 h-32 object-cover rounded"
                                        />

                                        <div className="flex-1 flex flex-col gap-3">
                                            <h2 className="font-bold text-lg">
                                                {product.title}
                                            </h2>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    disabled={isPending || item.quantity <= 1}
                                                    className="bg-zinc-800 text-white px-3 py-1 rounded disabled:opacity-50"
                                                    onClick={() =>
                                                        handleQuantityChange(item, -1)
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span className="font-bold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={isPending}
                                                    className="bg-zinc-800 text-white px-3 py-1 rounded disabled:opacity-50"
                                                    onClick={() =>
                                                        handleQuantityChange(item, 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="flex gap-3 items-center">
                                                <del className="text-gray-500">
                                                    ${Math.ceil(price)}
                                                </del>

                                                <span className="font-bold text-green-600">
                                                    ${discountedPrice}
                                                </span>
                                            </div>

                                            <p className="font-bold">
                                                Total: ${rowTotal}
                                            </p>

                                            <button
                                                type="button"
                                                disabled={isPending}
                                                className="bg-indigo-500 text-white px-4 py-2 rounded w-fit disabled:opacity-50"
                                                onClick={() => handleRemove(item)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order summary */}
                        <div className="bg-[#191A20] text-white rounded-lg p-6 h-fit w-full lg:w-80 shadow-md">
                            <h2 className="text-xl font-bold mb-5">
                                Order Summary
                            </h2>

                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between gap-2">
                                    <span>Total</span>
                                    <span className="font-bold">
                                        {isTotalLoading ? "..." : `$${totalPrice}`}
                                    </span>
                                </div>

                                <Button
                                    variant="contained"
                                    disabled={isTotalLoading}
                                    sx={{
                                        backgroundColor: "#4F46E5",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#4338CA",
                                        },
                                    }}
                                    onClick={() => navigate("/checkout")}
                                >
                                    Proceed
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 0 && (
                        <div className="flex justify-center items-center gap-4 py-8 text-white">
                            <button
                                disabled={!pagination.hasPrevPage || isFetching}
                                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <span>
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>

                            <button
                                disabled={!pagination.hasNextPage || isFetching}
                                onClick={() => setPage((prev) => prev + 1)}
                                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
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

export default Cart;
