import { useDispatch, useSelector } from "react-redux";
import { addQuantity, addToCart } from "../redux/cartSlice";
import { removeFromWishlist, setWishlist } from "../redux/wishlistSlice";
import useUpdateCart from "../hooks/Cart/useUpdateCart";
import { useEffect } from "react";
import useGetWishlist from "../hooks/useGetWishlist";
import Header from "../Components/Header";
import useUpdateWishlist from "../hooks/Wishlist/useUpdateWishlist";

function Wishlist() {
    const dispatch = useDispatch();

    const user = localStorage.getItem("userId");

    const cart = useSelector((state) => state.cart.items);

    const products = useSelector((state) => state.wishlist.items);

    const carts = useUpdateCart();
    const wishlists = useUpdateWishlist()
    const { data: wishlist } = useGetWishlist(user);

    useEffect(() => {
        if (wishlist) {
            dispatch(setWishlist(wishlist));
        }
    }, [wishlist, dispatch]);


   const handleAddToCart = (item) => {

    const updatedCart = [...cart, {...item,quantity :1}];

    const updatedWishlist = products.filter((product) => product.id !== item.id);

    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item));

    carts.mutate({
        userId: user,
        cart: updatedCart,
    });

    wishlists.mutate({
        userId: user,
        wishlist: updatedWishlist,
    });

};

    const handleRemoveWishlist = (item) => {


        const updatedWishlist = products.filter(
            (product) => product.id !== item.id
        );

        dispatch(removeFromWishlist(item));


        wishlists.mutate({
        userId : user,
        wishlist: updatedWishlist,
    });



    };

    return (
        <div className="min-h-screen bg-[#0B0B0F] pt-24 px-5">

            <Header />

            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                MY WISHLIST
            </h1>

            {products.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <h2 className="text-white text-2xl font-bold">
                        Your wishlist is empty
                    </h2>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto flex flex-col gap-5">

                    {products.map((item) => (

                        <div key={item.id} className=" bg-[#191A20] text-white rounded-xl shadow-lg p-5 flex flex-col md:flex-row items-center gap-6">

                            <img className="w-32 h-32 object-cover rounded-lg"
                                src={item.images[0] || item.images[1] || item.images[2]} alt={item.title} />

                            <div className="flex-1 flex flex-col gap-2">

                                <h2 className="font-bold text-xl">
                                    {item.title}
                                </h2>

                                <p className="text-green-600 font-bold text-lg">
                                    ${item.price}
                                </p>

                                <p className="text-gray-600">
                                    Stock: {item.stock}
                                </p>

                            </div>

                            <div className="flex flex-col gap-3">

                                <button onClick={() => handleAddToCart(item)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2
                                     rounded-lg font-bold transition"> Add to Cart</button>

                                <button onClick={() => handleRemoveWishlist(item)}
                                    className="bg-zinc-700 hover:bg-zinc-600 text-white 
                                    px-5 py-2 rounded-lg font-bold transition" >Remove </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Wishlist;