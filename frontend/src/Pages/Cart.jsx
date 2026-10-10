import { useDispatch, useSelector } from "react-redux";
import { removeCart, setCart } from "../redux/cartSlice";
import useUpdateCart from "../hooks/Cart/useUpdateCart";
import useGetCart from "../hooks/useGetCart";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function Cart() {
const navigate = useNavigate();
const dispatch = useDispatch();

const user = localStorage.getItem("userId");

const products = useSelector((state) => state.cart.items ?? []);

const { data: cart, isLoading } = useGetCart();
const { mutateAsync, isPending } = useUpdateCart();

useEffect(() => {
    if (cart) {
        dispatch(setCart(cart));
    }
}, [cart, dispatch]);

// Remove a product from the cart.
const handleRemove = async (item) => {
    const product = item.product ?? item;

    try {
        await mutateAsync({
            type: "remove",
            productId: product._id,
        });

        dispatch(removeCart(item));
    } catch (error) {
        console.error(
            "Failed to remove product:",
            error.response?.data ?? error.message
        );
    }
};

// Update quantity will be connected to a PATCH API next.
const handleQuantityChange = async (item, change) => {
    const product = item.product ?? item;
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return;

    try {
        await mutateAsync({
            type: "update",
            productId: product._id,
            quantity: newQuantity,
        });
    } catch (error) {
        console.error(
            "Failed to update quantity:",
            error.response?.data ?? error.message
        );
    }
};

if (isLoading) {
    return (
        <div className="min-h-screen bg-[#0B0B0F] pt-24">
            <Header />
            <p className="text-white text-center">
                Loading cart...
            </p>
        </div>
    );
}

if (products.length === 0) {
    return (
        <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
            <Header />
            <h1 className="text-white text-3xl font-bold">
                Your cart is empty
            </h1>
        </div>
    );
}

const totalPrice = products.reduce((total, item) => {
    const product = item.product ?? item;
    const price = Number(product.price) || 0;
    const discount = Number(product.discountPercentage) || 0;
    const discountedPrice = Math.ceil(price - (price * discount) / 100);

    return total + discountedPrice * item.quantity;
}, 0);

return (
    <div className="min-h-screen bg-[#0B0B0F] pt-24 px-5">
        <Header />

        <h1 className="text-white text-3xl font-bold mb-8">
            Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-5">
                {products.map((item) => {
                    const product = item.product ?? item;

                    const price = Number(product.price) || 0;
                    const discount =
                        Number(product.discountPercentage) || 0;

                    const discountedPrice = Math.ceil(
                        price - (price * discount) / 100
                    );

                    const rowTotal = discountedPrice * item.quantity;

                    return (
                        <div
                            key={product._id}
                            className="bg-[#191A20] text-white rounded-lg p-5 flex flex-col md:flex-row items-center gap-6 shadow-md"
                        >
                            <img
                                src={
                                    product.images?.[0] ??
                                    product.images?.[1] ??
                                    product.images?.[2] ??
                                    ""
                                }
                                alt={product.title ?? "Product"}
                                className="w-32 h-32 object-cover rounded"
                            />

                            <div className="flex-1 flex flex-col gap-3">
                                <h2 className="font-bold text-lg">
                                    {product.title}
                                </h2>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        disabled={isPending || item.quantity <= 1}
                                        className="bg-zinc-800 text-white px-3 py-1 rounded disabled:opacity-50"
                                        onClick={() =>
                                            handleQuantityChange(item, -1)
                                        }
                                    >
                                        -
                                    </button>

                                    <span className="font-bold">
                                        {item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        disabled={isPending}
                                        className="bg-zinc-800 text-white px-3 py-1 rounded disabled:opacity-50"
                                        onClick={() =>
                                            handleQuantityChange(item, 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <del className="text-gray-500">
                                        ${Math.ceil(price)}
                                    </del>

                                    <span className="font-bold text-green-600">
                                        ${discountedPrice}
                                    </span>
                                </div>

                                <p className="font-bold">
                                    Total: ${rowTotal}
                                </p>

                                <button
                                    type="button"
                                    disabled={isPending}
                                    className="bg-indigo-500 text-white px-4 py-2 rounded w-fit disabled:opacity-50"
                                    onClick={() => handleRemove(item)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[#191A20] text-white rounded-lg p-6 h-fit w-full lg:w-80 shadow-md">
                <h2 className="text-xl font-bold mb-5">
                    Order Summary
                </h2>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-2">
                        <span>Total</span>
                        <span className="font-bold">
                            ${totalPrice}
                        </span>
                    </div>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#4F46E5",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#4338CA",
                            },
                        }}
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    </div>
);


}

export default Cart;
