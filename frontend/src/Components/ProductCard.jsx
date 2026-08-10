import { FaStar } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {


   const  naviagte = useNavigate()
    return (
        <div key={product.id} className="relative py-4 flex flex-col shrink-0 w-[250px] h-[450px]
            rounded-xl bg-[#191A20] border border-white/10
            transition-all duration-300 hover:-translate-y-1
            hover:border-indigo-500/40 hover:shadow-xl" onClick={()=>naviagte(`/products/${product.category}/${product.id}`)}>
           

            <div className="absolute top-8 left-3 bg-indigo-600 text-white px-3 py-1 rounded-lg">
                {product.discountPercentage}% OFF
            </div>

            
            <div className="absolute right-3 top-7 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
            onClick={(e)=>e.stopPropagation()}>
                <WishlistButton product={product} />
            </div>

          
            <div className="flex-1 flex items-center justify-center px-4 pb-6">
                <img src={ product.images[2] || product.images[1] || product.images[0] }
                 alt={product.title} className="w-full h-56 object-contain"/>
            </div>

           
            <div className="px-3 flex flex-col gap-2 py-1">
                <h2 className="text-white font-semibold text-xl line-clamp-1">
                    {product.title}
                </h2>

                <p className="flex items-center gap-1 text-white">
                    {product.rating}
                    <FaStar className="text-amber-300" />
                </p>

                <p className="text-white font-medium">
                    ${product.price}
                </p>
            </div>

            
            <div className="px-3" onClick={(e)=>e.stopPropagation()}>
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}

export default ProductCard;