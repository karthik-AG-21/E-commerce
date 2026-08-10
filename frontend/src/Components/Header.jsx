import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CiUser } from "react-icons/ci";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

import icon from "/shopping-bag.svg";
import { id } from "zod/v4/locales";
import useGetCart from "../hooks/useGetCart";
import { setCart } from "../redux/cartSlice";
import { setWishlist } from "../redux/wishlistSlice";
import useGetWishlist from "../hooks/useGetWishlist";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [active, setActive] = useState("Home");
    const userId = localStorage.getItem("userId");


    const { data: cartData, isLoading: cartLoading,   error: cartError } = useGetCart(userId);
    const { data: wishlistData , isLoading: WishlistLoading,   error: wishlistError } =  useGetWishlist(userId)
    

    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);



   useEffect(() => {

    if(cartData){
        dispatch(setCart(cartData));
    }

    if(wishlistData){
        dispatch(setWishlist(wishlistData));
    }

}, [cartData, wishlistData, dispatch]);

    if (WishlistLoading) {
        return <h1>loading</h1>
    }

    if (wishlistError) {
        return <h1>error</h1>
    }


     if (cartLoading) {
        return <h1>loading</h1>
    }

    if (cartError) {
        return <h1>error</h1>
    }

    // console.log(data, "the cart data")

    



    function removeUser() {
        localStorage.removeItem("userId");
         
        navigate("/login");
    }

    const menus = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "Products", path: "/products" },
        { id: 3, name: "Orders", path: "/orders" },
    ];

    return (
        <div className="fixed top-0 left-0 z-50 w-full flex justify-around items-center py-4 bg-black/10 backdrop-blur-md border-b border-white/10">

            {/* Logo */}

            <h1 className="flex items-center text-3xl font-extrabold tracking-wide text-white cursor-pointer" onClick={() => navigate("/")} >
                <img src={icon} alt="TechStore" className="w-12 h-12" />
                Tech<span className="text-indigo-600">Store</span>
            </h1>



            <div className="flex gap-8">

                {menus.map((menu) => (

                    <button key={menu.id}
                        onClick={() => {setActive(menu.name);
                            navigate(menu.path)}}

                        className={`transition-all duration-300 pb-1
                        ${active === menu.name ? "text-white border-b-2 border-indigo-500" : "text-zinc-300 hover:text-white"
                            }`}>{menu.name}</button>))}

            </div>



            <div className="flex items-center gap-6">



               

                {/* Wishlist */}

                {userId && (
                    <>

                     <button onClick={() => navigate("/cart")}
                    className="relative text-xl text-zinc-300 hover:text-white transition-colors duration-300">
                    <FaShoppingCart />

                    {cartItems.length > 0 && (
                        <span
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500
                         text-white text-[10px] flex items-center justify-center ">
                            {cartItems.length}
                    </span>
                    )}
                </button>

                    <button
                        onClick={() => navigate("/wishlist")}
                        className="relative text-xl text-zinc-300 hover:text-white transition-colors duration-300">
                        <FaRegHeart />

                        {wishlistItems?.length > 0 && (
                            <span className=" absolute -top-2  -right-2 w-5 h-5 rounded-full
                             bg-indigo-600 text-white text-[10px] flex items-center justify-center" >
                                {wishlistItems?.length}
                            </span>
                        )}
                    </button>
                    </>
                )}

                {userId ? (<button
                    onClick={removeUser} className="flex items-center gap-2 px-4 py-2 
                        rounded-xl bg-white/5 border border-white/10 text-zinc-300
                        hover:text-white  hover:bg-white/10 transition-all ">
                    <IoIosLogOut className="text-xl" />
                    Logout
                </button>
                ) : (
                    <button onClick={() => navigate("/login")}
                        className="flex items-center gap-2 px-4 py-2 
                        rounded-xl bg-white/5 border border-white/10 text-zinc-300
                        hover:text-white  hover:bg-white/10 transition-all ">
                        <CiUser className="text-xl" />
                        Login
                    </button>
                )}

            </div>

        </div>
    );
}

export default Header;