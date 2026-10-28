
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdOutlineDoubleArrow } from "react-icons/md";

import useMobiles from "../hooks/useMobiles";
import useGetWishlist from "../hooks/useGetWishlist";
import { setWishlistProductIds } from "../redux/wishlistSlice";
import ProductCard from "./ProductCard";

function TrendingProducts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = localStorage.getItem("userId");

    // Fetch wishlist IDs independently of the current page.
    const { data: wishlistResponse } = useGetWishlist(user, 1, 5);

    useEffect(() => {
        if (Array.isArray(wishlistResponse?.wishlistProductIds)) {
            dispatch(
                setWishlistProductIds(
                    wishlistResponse.wishlistProductIds
                )
            );
        }
    }, [wishlistResponse?.wishlistProductIds, dispatch]);

    const { data, isLoading, error } = useMobiles();

    const filteredMobile = useMemo(() => {
        if (!data) return [];
        return data.slice(0, 10);
    }, [data]);

    if (isLoading) {
        return (
            <div className="bg-[#0B0B0F] px-4 py-10 text-center text-white">
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#0B0B0F] px-4 py-10 text-center text-white">
                Error loading products.
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-[#0B0B0F] px-4 py-10 text-center text-white">
                No products found.
            </div>
        );
    }

    return (
        <section className="w-full overflow-hidden bg-[#0B0B0F]">

            {/* Section heading */}
            <div className="flex items-center justify-between gap-3 px-4 py-5 sm:px-8 sm:py-4">

                <h2 className="min-w-0 text-xl font-bold leading-tight text-white sm:text-3xl">
                    Trending Products
                </h2>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#4F46E5",
                        color: "#fff",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        minWidth: 0,
                        borderRadius: "10px",
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "12px", sm: "14px" },
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#4338CA",
                        },
                    }}
                    onClick={() => navigate("/products")}
                >
                    View More
                    <MdOutlineDoubleArrow className="ml-1 text-lg sm:text-xl" />
                </Button>
            </div>

            {/* Horizontally scrollable products */}
            <div className="hide-scrollbar flex w-full gap-4 overflow-x-auto overscroll-x-contain px-4 py-4 sm:gap-8 sm:px-6">

                {filteredMobile.map((product) => (
                    <div
                        key={product._id ?? product.id}
                        className="w-[min(78vw,280px)] shrink-0 sm:w-auto"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}

            </div>
        </section>
    );
}

export default TrendingProducts;
