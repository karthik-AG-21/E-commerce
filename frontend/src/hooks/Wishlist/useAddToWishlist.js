import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUpdateWishlist from "../Wishlist/useUpdateWishlist";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";


 function useAddToWishlist(product) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlist = useSelector((state) => state.wishlist?.items);


    const { mutate } = useUpdateWishlist();


    const userId = localStorage.getItem("userId");


    const isWishlisted = wishlist.some((item) => item.id === product.id);


    const toggleWishlist = (product) => {


        if (!userId) {
            navigate("/login");
            return;
        }


        let updatedWishlist;


        if (isWishlisted) {

            updatedWishlist = wishlist.filter((item) => item.id !== product.id);


            dispatch(removeFromWishlist(product))


        } else {

            updatedWishlist = [ ...wishlist,  product ];


            dispatch(addToWishlist(product));

        }



        mutate({ userId, wishlist:updatedWishlist });

    };


    return { toggleWishlist, isWishlisted};

}

export default useAddToWishlist;