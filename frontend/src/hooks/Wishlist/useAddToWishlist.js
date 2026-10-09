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

    const wishlist = useSelector(
        (state) => state.wishlist.items
    );

    const { mutateAsync , isPending } = useUpdateWishlist();

    const userId = localStorage.getItem("userId");

    const isWishlisted = wishlist.some(
        (item) => String(item.product?._id) === String(product._id)
    );

    const toggleWishlist = async () => {
        if (!userId) {
            navigate("/login");
            return;
        }

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
        isPending
    };
}

export default useAddToWishlist;