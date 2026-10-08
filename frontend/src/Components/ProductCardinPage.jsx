import { FaStar } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { IoCheckmarkCircle } from "react-icons/io5";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import { useNavigate } from "react-router-dom";

function ProductCards({ product }) {

    const navigate = useNavigate();

    // const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const price = Number(product?.price || 0);
    const discount = Number(product?.discountPercentage || 0);

    const discountedPrice = ( price * (1 - discount / 100)).toFixed(2);

    return (

        <div

            onClick={() => navigate(`/products/${product.category}/${product?._id}`)}

            className="relative w-[270px] rounded-2xl bg-[#191A20] border
            border-white/10 hover:border-indigo-500/40 hover:-translate-y-1 
            transition-all duration-300 overflow-hidden cursor-pointer " >

            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-lg">

                {Number(product.discountPercentage || 0).toFixed(0)}% OFF

            </div>



            <div
                onClick={(e) => e.stopPropagation()}

                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10
                flex justify-center items-center " >

                <WishlistButton product={product} />

            </div>



            <div className="h-48 flex justify-center items-center p-6">

                <img src={product?.images?.[2] || product?.images?.[1] || product?.images?.[0] || product?.thumbnail}
                    alt={product.title}
                    className="w-full h-40 object-contain transition duration-300 hover:scale-105" />

            </div>



            <div className="px-5 pb-5 flex flex-col gap-2">

                <p className="text-indigo-400 text-sm font-medium"> {product?.brand || product?.title} </p>

                <h2 className="text-white font-semibold text-lg line-clamp-2"> {product.title} </h2>


                <div className="flex items-center gap-2">

                    <FaStar className="text-yellow-400" />

                    <span className="text-white">{product.rating} </span>

                    <span className="text-zinc-500"> ({product.reviews?.length || 0}) </span>

                </div>



                <div className="flex items-center gap-3">

                    <p className="text-2xl text-white font-bold">${discountedPrice || product?.price} </p>
                    <p className="text-zinc-500 line-through"> ${product.price} </p>

                </div>



                <div className="flex items-center gap-2 text-sm">

                    <IoCheckmarkCircle className="text-green-400" />

                    <span className="text-green-400">
                        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                    </span>
                </div>


                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <BsTruck />

                    <span> {product?.shippingInformation || "ships in two days"} </span>
                </div>



                <div className="mt-2" onClick={(e) => e.stopPropagation()}>

                    <AddToCartButton product={product} />

                </div>

            </div>

        </div>

    );
}

export default ProductCards;