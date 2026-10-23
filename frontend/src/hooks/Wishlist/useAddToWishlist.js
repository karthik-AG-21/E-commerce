
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUpdateWishlist from "../Wishlist/useUpdateWishlist";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../redux/wishlistSlice";

function useAddToWishlist(product) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Read all wishlist product IDs from Redux
    const wishlistProductIds = useSelector(
        (state) => state.wishlist.productIds ?? []
    );

    const { mutateAsync, isPending } = useUpdateWishlist();

    const userId = localStorage.getItem("userId");

    // Check by product ID, regardless of pagination
    const isWishlisted =
        Array.isArray(wishlistProductIds) &&
        wishlistProductIds.includes(String(product?._id));

    const toggleWishlist = async () => {
        if (!userId) {
            navigate("/login");
            return;
        }

        if (!product?._id || isPending) return;

        try {
            if (isWishlisted) {
                await mutateAsync({
                    type: "remove",
                    productId: product._id,
                });

                dispatch(removeFromWishlist(product));
            } else {
                await mutateAsync({
                    type: "add",
                    productId: product._id,
                });

                dispatch(addToWishlist(product));
            }
        } catch (error) {
            console.error(
                "Failed to update wishlist:",
                error.response?.data || error.message
            );
        }
    };

    return {
        toggleWishlist,
        isWishlisted,
        isPending,
    };
}

export default useAddToWishlist;
