
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
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error loading products.</h1>;
    }

    if (!data || data.length === 0) {
        return <h1>No products found.</h1>;
    }

    return (
        <div className="bg-[#0B0B0F]">
            <div className="flex justify-between px-8 py-4">
                <p className="text-white font-bold text-3xl">
                    Trending Products
                </p>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#4F46E5",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#4338CA",
                        },
                    }}
                    onClick={() => navigate("/products")}
                >
                    View More
                    <MdOutlineDoubleArrow className="text-xl" />
                </Button>
            </div>

            <div className="flex hide-scrollbar overflow-auto px-6 py-4 gap-8">
                {filteredMobile.map((product) => (
                    <ProductCard
                        key={product._id ?? product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}

export default TrendingProducts;
