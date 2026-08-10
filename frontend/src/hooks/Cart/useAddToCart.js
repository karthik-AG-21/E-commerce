

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart  } from "../../redux/cartSlice";
import { toast } from "react-toastify";


const useAddToCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    

    const addProductToCart = (product) => {

        const userId = localStorage.getItem("userId");

        
        if (!userId) {
            toast.error("please login ")
            navigate("/login");
            
            return;
        }

        
       
        dispatch(addToCart(product));

    };


    return { addProductToCart  };

};

export default useAddToCart;