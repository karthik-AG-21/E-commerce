import useAddToWishlist from "../hooks/Wishlist/useAddToWishlist";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function WishlistButton({ product }) {
    const { toggleWishlist, isWishlisted, isPending  } = useAddToWishlist(product);

    return (
        <button
            type="button"
            onClick={toggleWishlist}
            disabled={isPending}
            className="cursor-pointer">
            {isWishlisted ? (<FaHeart className="text-red-500 text-xl" />) : (
                <FaRegHeart className="text-white text-xl hover:text-red-500 transition-colors" />
            )}
        </button>
    );
}

export default WishlistButton;