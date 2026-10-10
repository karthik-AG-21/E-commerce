import Button from "@mui/material/Button";
import useAddToCart from "../hooks/Cart/useAddToCart";
import { useSelector } from "react-redux";
import useUpdateCart from "../hooks/Cart/useUpdateCart";
import { useEffect } from "react";
import { isPending } from "@reduxjs/toolkit";

function AddToCartButton({ product }) {
    const { addProductToCart   } = useAddToCart();

    const cart = useSelector((state) => state.cart.items);

    const { mutate } = useUpdateCart();
    
    const user = localStorage.getItem("userId");

    useEffect(() => {
        if (cart.length > 0 && user) {
            mutate({ userId: user, cart: cart });
        }
    }, [cart]);


    return (

        <Button variant="contained" sx={{
            backgroundColor: "#4F46E5", color: "#fff", "&:hover":
                { backgroundColor: "#4338CA", },
        }} onClick={() => addProductToCart(product)} >Add To Cart</Button>
    );
}

export default AddToCartButton;