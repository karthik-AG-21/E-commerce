
import { FaStar } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    const image =
        product?.images?.[2] ||
        product?.images?.[1] ||
        product?.images?.[0] ||
        product?.thumbnail;

    return (
        <div
            className="relative mx-auto flex h-[430px] w-full min-w-0 max-w-[320px] flex-col 
            overflow-hidden rounded-xl border border-white/10 bg-[#191A20] py-4 transition-all duration-300 hover:-translate-y-1
             hover:border-indigo-500/40 hover:shadow-xl sm:h-[450px] min-[580px]:max-w-none"
            onClick={() =>
                navigate(`/products/${product.category}/${product?._id}`)
            }
        >
            {/* Discount badge */}
            <div className="absolute left-3 top-7 z-10 rounded-lg bg-indigo-600 px-2 py-1 text-xs text-white sm:px-3 sm:text-sm">
                {product.discountPercentage}% OFF
            </div>

            {/* Wishlist */}
            <div
                className="absolute right-3 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:h-10 sm:w-10"
                onClick={(e) => e.stopPropagation()}
            >
                <WishlistButton product={product} />
            </div>

            {/* Product image */}
            <div className="flex min-h-0 flex-1 items-center justify-center px-3 pb-4 pt-8 sm:px-4 sm:pb-6">
                <img
                    src={image}
                    alt={product.title}
                    loading="lazy"
                    className="h-48 w-full max-w-full object-contain sm:h-56"
                />
            </div>

            {/* Product details */}
            <div className="flex flex-col gap-2 px-3 py-1">
                <h2 className="line-clamp-2 min-h-12 break-words text-base font-semibold text-white sm:text-xl">
                    {product.title}
                </h2>

                <p className="flex items-center gap-1 text-sm text-white sm:text-base">
                    {product.rating}
                    <FaStar className="text-amber-300" />
                </p>

                <p className="text-sm font-medium text-white sm:text-base">
                    ${product.price}
                </p>
            </div>

            {/* Add to cart */}
            <div
                className="mt-2 px-3"
                onClick={(e) => e.stopPropagation()}
            >
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}

export default ProductCard;
