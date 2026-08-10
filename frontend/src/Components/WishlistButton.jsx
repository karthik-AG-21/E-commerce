import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAddToWishlist from "../hooks/Wishlist/useAddToWishlist";
import { CiHeart } from "react-icons/ci";



function WishlistButton({product}){

    const {toggleWishlist , isWishlisted } = useAddToWishlist(product)
    // console.log("button",product)

    return (
        <button  onClick={()=>toggleWishlist(product)} className="cursor-pointer">
            {isWishlisted ? <FaHeart className="text-red-500 text-xl" /> :
               <FaRegHeart className="text-white text-xl hover:text-red-500 transition-colors" />}</button>
    )
}

export default WishlistButton;