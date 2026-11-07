import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist, setWishlistProductIds, } from "../redux/wishlistSlice";
import useUpdateCart from "../hooks/Cart/useUpdateCart";
import { useState, useEffect } from "react";
import useGetWishlist from "../hooks/useGetWishlist";
import Header from "../Components/Header";
import useUpdateWishlist from "../hooks/Wishlist/useUpdateWishlist";
import { toast } from "react-toastify";
import { PageError, PageLoader } from "../Components/PageStatus";

function Wishlist() {
    const dispatch = useDispatch();

    const user = localStorage.getItem("userId");

    // Pagination state
    const [page, setPage] = useState(1);
    const limit = 5;

    const carts = useUpdateCart();
    const wishlists = useUpdateWishlist();

    const {
        data: wishlistResponse,
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useGetWishlist(user, page, limit);

    // Current page's products and pagination metadata
    const products = wishlistResponse?.items ?? [];
    const pagination = wishlistResponse?.pagination;


    // Keep Redux compatible with your existing wishlist buttons
    useEffect(() => {
        const wishlistProductIds = wishlistResponse?.wishlistProductIds ?? [];

        if (Array.isArray(wishlistProductIds)) {
            dispatch(setWishlistProductIds(wishlistProductIds));
        }
    }, [wishlistResponse?.wishlistProductIds, dispatch]);

    const handleAddToCart = async (product) => {
        if (!product?._id) {
            toast.error("Invalid product");
            return;
        }

        try {
            await carts.mutateAsync({
                type: "add",
                productId: product._id,
                quantity: 1,
            });

            dispatch(addToCart({
                product,
                quantity: 1,
            }));

            await wishlists.mutateAsync({
                type: "remove",
                productId: product._id,
            });

            dispatch(removeFromWishlist({ product }));

            toast.success("Product added to cart");
        } catch (error) {
            console.error(
                "Failed to move product to cart:",
                error.response?.data ?? error.message
            );

            toast.error(
                error.response?.data?.message ??
                "Failed to move product to cart"
            );
        }
    };

    const handleRemoveWishlist = async (item) => {
        try {
            await wishlists.mutateAsync({
                type: "remove",
                productId: item.product._id,
            });

            dispatch(removeFromWishlist(item));

            // If the last item on this page was removed,
            // go back to the previous page.
            if (products.length === 1 && page > 1) {
                setPage((prev) => prev - 1);
            }
        } catch (error) {
            console.error(
                "Failed to remove wishlist item:",
                error.response?.data || error.message
            );

            toast.error("Failed to remove wishlist item");
        }
    };


    if (isLoading) {
        return <PageLoader message="Loading your wishlist..." />;
    }

    if (isError) {
        return (
            <PageError
                message="Failed to load your wishlist."
                onRetry={refetch}
            />
        );
    }



    return (
        <div className="min-h-screen w-full overflow-x-clip bg-[#0B0B0F] px-4 pt-24 sm:px-5">

            <Header />

            <main className="mx-auto max-w-5xl py-8">

                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                        My Wishlist
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Your favorite products in one place.
                    </p>
                </div>

                {
                    isFetching && wishlistResponse && (
                        <p className="py-2 text-center text-sm text-gray-400">
                            Updating wishlist...
                        </p>
                    )
                }

                {/* Loading */}
                {products.length === 0 ? (

                    /* Empty Wishlist */
                    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">

                        <div className="mb-5 text-6xl">
                            ♡
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            Your wishlist is empty
                        </h2>

                        <p className="mt-3 max-w-sm text-gray-400">
                            You haven't added any products to your wishlist yet.
                            Start exploring and save your favorites!
                        </p>

                    </div>

                ) : (

                    /* Wishlist Products */
                    <div className="flex flex-col gap-5">

                        {products.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col items-center gap-5 rounded-xl border border-white/10 bg-[#191A20] p-5 text-white shadow-lg md:flex-row"
                            >

                                {/* Image */}
                                <img
                                    className="h-36 w-36 rounded-lg bg-[#0B0B0F] object-contain p-2"
                                    src={
                                        item?.product?.thumbnail?.url ||
                                        item?.product?.thumbnail ||
                                        item?.product?.images?.[0] ||
                                        ""
                                    }
                                    alt={item?.product?.title || "Product"}
                                />

                                {/* Details */}
                                <div className="flex flex-1 flex-col gap-2 text-center md:text-left">

                                    <h2 className="text-xl font-bold">
                                        {item?.product?.title}
                                    </h2>

                                    <p className="text-lg font-bold text-green-500">
                                        ${item?.product?.price}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Stock: {item?.product?.stock}
                                    </p>

                                </div>

                                {/* Buttons */}
                                <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:flex-col">

                                    <button
                                        onClick={() =>
                                            handleAddToCart(item?.product)
                                        }
                                        className="rounded-lg bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
                                    >
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleRemoveWishlist(item)
                                        }
                                        className="rounded-lg bg-zinc-700 px-5 py-3 font-bold text-white transition hover:bg-zinc-600"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>
                        ))}

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 0 && (
                            <div className="flex flex-wrap items-center justify-center gap-4 py-8 text-white">

                                <button
                                    disabled={!pagination.hasPrevPage}
                                    onClick={() =>
                                        setPage((prev) =>
                                            Math.max(1, prev - 1)
                                        )
                                    }
                                    className="rounded-lg bg-indigo-600 px-5 py-2 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span className="text-sm text-gray-300">
                                    Page {pagination.currentPage} of{" "}
                                    {pagination.totalPages}
                                </span>

                                <button
                                    disabled={!pagination.hasNextPage}
                                    onClick={() =>
                                        setPage((prev) => prev + 1)
                                    }
                                    className="rounded-lg bg-indigo-600 px-5 py-2 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>

                            </div>
                        )}

                    </div>
                )}

            </main>
        </div>
    );

}

export default Wishlist;
