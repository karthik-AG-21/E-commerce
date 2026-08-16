import { useDispatch, useSelector } from "react-redux";
import { addQuantity, removeCart, removeQuantity, setCart } from "../redux/cartSlice";
import useUpdateCart from "../hooks/Cart/useUpdateCart";
import useGetCart from "../hooks/useGetCart";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";


function Cart() {

    const naviagte = useNavigate()
    const { mutate } = useUpdateCart();

    const user = localStorage.getItem("userId");

    const dispatch = useDispatch();

    const products = useSelector((state) => state.cart.items);


    const { data: cart, isLoading } = useGetCart(user);

    useEffect(() => {
        if (cart) {
            dispatch(setCart(cart));
        }
    }, [cart, dispatch]);

    const updateDatabaseCart = (updatedCart) => {
        if (!user) return;

        mutate({ userId: user, cart: updatedCart, });
    };


    const totalPrice = products.reduce((total, item) => {
        const discountedPrice = Math.ceil(
            item.price - (item.price / 100) * item.discountPercentage
        );
        // console.log(item.quantity ,"count")
        return total + discountedPrice * item.quantity
    }, 0);

    // console.log("cal",totalPrice)


    if (products.length === 0) {
        return (
            <div className="min-h-screen   bg-[#0B0B0F]  flex items-center justify-center">
                <Header />
                <h1 className="text-white text-3xl font-bold">Your cart is empty</h1>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#0B0B0F] pt-24 px-5">

            <Header />

            <h1 className="text-white text-3xl font-bold mb-8">Shopping Cart</h1>


            <div className="flex flex-col lg:flex-row gap-8">


                <div className="flex-1 flex flex-col gap-5">

                    {products.map((item) => {

                        const discountedPrice = Math.ceil(item.price - (item.price / 100) * item.discountPercentage);

                        const rowTotal = discountedPrice * item.quantity;


                        return (
                            <div key={item.id} className=" bg-[#191A20] text-white rounded-lg p-5 flex flex-col md:flex-row items-center gap-6 shadow-md" >

                                <img src={item.images[0] || item.images[1] || item.images[2]} alt={item.title} className="w-32 h-32 object-cover rounded" />

                                <div className="flex-1 flex flex-col gap-3">

                                    <h2 className="font-bold text-lg">
                                        {item.title}
                                    </h2>

                                    <div className="flex items-center gap-4">

                                        <button
                                            type="button"
                                            className="bg-zinc-800 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                                if (item.quantity <= 1) return;
                                                dispatch(removeQuantity(item));

                                                const updatedCart = products.map((product) =>
                                                    product.id === item.id ? { ...product, quantity: product.quantity - 1, } : product);
                                                updateDatabaseCart(updatedCart);
                                            }}>-</button>


                                        <span className="font-bold">{item.quantity} </span>


                                        <button type="button"
                                            className="bg-zinc-800 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                                dispatch(addQuantity(item));
                                                const updatedCart = products.map((product) =>
                                                    product.id === item.id ? { ...product, quantity: product.quantity + 1, }
                                                        : product); updateDatabaseCart(updatedCart);
                                            }}>+</button>
                                    </div>


                                    <div className="flex gap-3 items-center">

                                        <del className="text-gray-500"> ${Math.ceil(item.price)}</del>

                                        <span className="font-bold text-green-600">${discountedPrice}</span>

                                    </div>

                                    <p className="font-bold">Total: ${rowTotal}</p>

                                    <button
                                        type="button"
                                        className="bg-indigo-500 text-white px-4 py-2 rounded w-fit"
                                        onClick={() => {
                                            dispatch(removeCart(item));
                                            const updatedCart = products.filter(
                                                (product) => product.id !== item.id
                                            ); updateDatabaseCart(updatedCart);
                                        }}>Remove </button>

                                </div>

                            </div>
                        );
                    })}

                </div>



                <div className="bg-[#191A20] text-white rounded-lg p-6 h-fit w-full lg:w-80 shadow-md">

                    <h2 className="text-xl font-bold mb-5"> Order Summary </h2>

                    <div className="flex flex-col gap-2 justify-between">
                        <div className="flex gap-2">
                            <span>Total</span>
                            <span className="font-bold"> ${totalPrice}</span>
                        </div>

                        <Button variant="contained" sx={{
                            backgroundColor: "#4F46E5", color: "#fff", "&:hover":
                                { backgroundColor: "#4338CA", },
                        }} onClick={() => naviagte("/checkout")}>Proceed</Button>

                    </div>

                </div>


            </div>

        </div>
    );
}

export default Cart;