import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist, setWishlistProductIds, } from "../redux/wishlistSlice";
import useUpdateCart from "../hooks/Cart/useUpdateCart";
import { useState, useEffect } from "react";
import useGetWishlist from "../hooks/useGetWishlist";
import Header from "../Components/Header";
import useUpdateWishlist from "../hooks/Wishlist/useUpdateWishlist";
import { toast } from "react-toastify";

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
    } = useGetWishlist(user, page, limit);

    // Current page's products and pagination metadata
    const products = wishlistResponse?.items ?? [];
    const pagination = wishlistResponse?.pagination;
    const wishlistProductIds = wishlistResponse?.wishlistProductIds ?? [];

    // Keep Redux compatible with your existing wishlist buttons
    useEffect(() => {
        if (Array.isArray(wishlistProductIds)) {
            dispatch(setWishlistProductIds(wishlistProductIds));
        }
    }, [wishlistProductIds, dispatch]);

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

    return (
        <div className="min-h-screen bg-[#0B0B0F] pt-24 px-5">
            <Header />

            {isLoading && !wishlistResponse ? (
                <div className="flex justify-center items-center h-96">
                    <p className="text-white text-xl">
                        Loading wishlist...
                    </p>
                </div>
            ) : isError ? (
                <div className="flex justify-center items-center h-96">
                    <p className="text-white text-xl">
                        Failed to load wishlist.
                    </p>
                </div>
            ) : products.length === 0 ? (
                <div className="flex justify-center items-center h-128">
                    <h2 className="text-white text-3xl font-bold">
                        Your wishlist is empty
                    </h2>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto flex flex-col gap-5">
                    {products.map((item) => (
                        <div
                            key={item.product._id}
                            className="bg-[#191A20] text-white rounded-xl shadow-lg p-5 flex flex-col md:flex-row items-center gap-6"
                        >
                            <img
                                className="w-32 h-32 object-cover rounded-lg"
                                src={
                                    item.product?.images?.[0] ||
                                    item.product?.images?.[1] ||
                                    item.product?.images?.[2]
                                }
                                alt={item.product?.title}
                            />

                            <div className="flex-1 flex flex-col gap-2">
                                <h2 className="font-bold text-xl">
                                    {item.product.title}
                                </h2>

                                <p className="text-green-600 font-bold text-lg">
                                    ${item.product.price}
                                </p>

                                <p className="text-gray-400">
                                    Stock: {item.product.stock}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() =>
                                        handleAddToCart(item.product)
                                    }
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold transition"
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() =>
                                        handleRemoveWishlist(item)
                                    }
                                    className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-2 rounded-lg font-bold transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Pagination controls */}
                    {pagination && pagination.totalPages > 0 && (
                        <div className="flex justify-center items-center gap-4 py-8 text-white">
                            <button
                                disabled={!pagination.hasPrevPage}
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.max(1, prev - 1)
                                    )
                                }
                                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <span>
                                Page {pagination.currentPage} of{" "}
                                {pagination.totalPages}
                            </span>

                            <button
                                disabled={!pagination.hasNextPage}
                                onClick={() =>
                                    setPage((prev) => prev + 1)
                                }
                                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
