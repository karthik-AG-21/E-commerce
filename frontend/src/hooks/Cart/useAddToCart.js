import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

import { addToCart } from "../../redux/cartSlice";
import useUpdateCart from "./useUpdateCart";

const useAddToCart = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const { mutateAsync , isPending } = useUpdateCart();
const [isAdding, setIsAdding] = useState(false);

const addProductToCart = async (product) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        toast.error("Please log in first");
        navigate("/login");
        return;
    }

    if (!product?._id || isAdding) {
        return;
    }

    setIsAdding(true);

    try {
        // Save the product to MongoDB.
        await mutateAsync({
            type: "add",
            productId: product._id,
            quantity: 1,
        });

        // Update Redux only after the API succeeds.
        dispatch(addToCart({
            product,
            quantity: 1,
        }));

        toast.success("Product added to cart");
    } catch (error) {
        console.error(
            "Failed to add product to cart:",
            error.response?.data ?? error.message
        );

        toast.error(
            error.response?.data?.message ?? "Failed to add product to cart"
        );
    } finally {
        setIsAdding(false);
    }
};

return {
    addProductToCart,
    isAdding,
    isPending
};

};

export default useAddToCart;
