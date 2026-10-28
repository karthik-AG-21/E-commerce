
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaShoppingCart, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

import icon from "/shopping-bag.svg";
import useGetCart from "../hooks/useGetCart";
import useGetWishlist from "../hooks/useGetWishlist";
import { setCart } from "../redux/cartSlice";
import { setWishlist, setWishlistProductIds } from "../redux/wishlistSlice";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false);

    const userId = localStorage.getItem("userId");

    const { data: cartData } = useGetCart(userId);
    const { data: wishlistData } = useGetWishlist(userId);

    const wishlistCount = wishlistData?.pagination?.totalItems ?? 0;
    const cartCount = cartData?.pagination?.totalItems ?? 0;

    const cartItems = useSelector((state) => state.cart.items ?? []);
    const wishlistItems = useSelector((state) => state.wishlist.items ?? []);

    useEffect(() => {
        if (!userId) {
            dispatch(setCart([]));
            dispatch(setWishlist([]));
            dispatch(setWishlistProductIds([]));
            return;
        }

        if (Array.isArray(cartData?.items)) {
            dispatch(setCart(cartData.items));
        }

        if (Array.isArray(wishlistData?.wishlistProductIds)) {
            dispatch(setWishlistProductIds(wishlistData.wishlistProductIds));
        }
    }, [userId, cartData, wishlistData, dispatch]);

    // Close mobile menu whenever the route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const userData = (() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    })();

    const menus = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "Products", path: "/products" },
        { id: 3, name: "Orders", path: "/orders" },
    ];

    function removeUser() {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");

        dispatch(setCart([]));
        dispatch(setWishlist([]));
        dispatch(setWishlistProductIds([]));

        setMenuOpen(false);
        navigate("/login");
    }

    function goTo(path) {
        setMenuOpen(false);
        navigate(path);
    }

    const linkClass = (path) =>
        `block w-full rounded-lg px-4 py-3 text-left transition-colors ${location.pathname === path
            ? "bg-indigo-600/20 text-white"
            : "text-zinc-300 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip 
            border-b border-white/10 bg-black/30 backdrop-blur-xl">
            {/* Main header row */}
            <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">

                {/* Logo */}
                <button
                    onClick={() => goTo("/")}
                    aria-label="TechStore home"
                    className="flex shrink-0 items-center text-xl font-extrabold tracking-wide text-white sm:text-2xl"
                >
                    <img
                        src={icon}
                        alt=""
                        className="mr-1 h-9 w-9 sm:h-11 sm:w-11"
                    />
                    Tech<span className="text-indigo-500">Store</span>
                </button>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                    {menus.map((menu) => {
                        const isActive = location.pathname === menu.path;

                        return (
                            <button
                                key={menu.id}
                                onClick={() => goTo(menu.path)}
                                aria-current={isActive ? "page" : undefined}
                                className={`border-b-2 py-2 transition-colors ${isActive
                                    ? "border-indigo-500 text-white"
                                    : "border-transparent text-zinc-300 hover:text-white"
                                    }`}
                            >
                                {menu.name}
                            </button>
                        );
                    })}
                </nav>

                {/* Desktop user actions */}
                <div className="hidden items-center gap-4 md:flex lg:gap-6">
                    {userId && (
                        <>
                            <button
                                onClick={() => goTo("/cart")}
                                aria-label={`Shopping cart, ${cartCount} items`}
                                className="relative p-2 text-xl text-zinc-300 hover:text-white"
                            >
                                <FaShoppingCart />
                                {cartCount > 0 && (
                                    <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => goTo("/wishlist")}
                                aria-label={`Wishlist, ${wishlistCount} items`}
                                className="relative p-2 text-xl text-zinc-300 hover:text-white"
                            >
                                <FaRegHeart />
                                {wishlistCount > 0 && (
                                    <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] text-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => goTo("/profile")}
                                title="My Profile"
                                aria-label="My Profile"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/50 bg-indigo-600/20 text-lg font-bold text-indigo-300 transition hover:bg-indigo-600 hover:text-white"
                            >
                                {userData?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
                            </button>
                        </>
                    )}

                    {userId ? (
                        <button
                            onClick={removeUser}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                        >
                            <IoIosLogOut className="text-xl" />
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => goTo("/login")}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                        >
                            <CiUser className="text-xl" />
                            Login
                        </button>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    className="flex h-11 w-11 items-center justify-center rounded-lg text-xl text-white transition hover:bg-white/10 md:hidden"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile navigation panel */}
            {menuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-white/10 bg-zinc-950/95 px-4 pb-5 pt-3 shadow-xl backdrop-blur-xl md:hidden"
                >
                    <nav className="flex flex-col gap-1">
                        {menus.map((menu) => (
                            <button
                                key={menu.id}
                                onClick={() => goTo(menu.path)}
                                aria-current={
                                    location.pathname === menu.path ? "page" : undefined
                                }
                                className={linkClass(menu.path)}
                            >
                                {menu.name}
                            </button>
                        ))}
                    </nav>


                    {userId && (
                        <nav className="mt-1 flex flex-col gap-1">
                            <button
                                onClick={() => goTo("/cart")}
                                className={linkClass("/cart")}
                                aria-current={location.pathname === "/cart" ? "page" : undefined}
                            >
                                <span className="flex items-center gap-3">
                                    <FaShoppingCart className="text-base" />
                                    Cart
                                    {cartCount > 0 && (
                                        <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </span>
                            </button>

                            <button
                                onClick={() => goTo("/wishlist")}
                                className={linkClass("/wishlist")}
                                aria-current={location.pathname === "/wishlist" ? "page" : undefined}
                            >
                                <span className="flex items-center gap-3">
                                    <FaRegHeart className="text-base" />
                                    Wishlist
                                    {wishlistCount > 0 && (
                                        <span className="ml-auto rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </span>
                            </button>
                        </nav>
                    )}

                    {userId && (
                        <button
                            onClick={() => goTo("/profile")}
                            className="mt-3 flex min-h-12 w-full items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-white/10"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold">
                                {userData?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                            My Profile
                        </button>
                    )}

                    {userId ? (
                        <button
                            onClick={removeUser}
                            className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-zinc-200 hover:bg-white/10"
                        >
                            <IoIosLogOut className="text-xl" />
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => goTo("/login")}
                            className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
                        >
                            <CiUser className="text-xl" />
                            Login
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
