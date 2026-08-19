import { useNavigate, useParams } from "react-router-dom";
import useProductById from "../hooks/useProductById";

import {
    FaStar,
    FaTruck,
    FaShieldAlt,
} from "react-icons/fa";

import { MdVerified } from "react-icons/md";

import Footer from "../Components/Footer";
import AddToCartButton from "../Components/AddToCartButton";
import Header from "../Components/Header";


function ProductDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        data,
        isLoading,
        error
    } = useProductById(id);


    // -----------------------------
    // Loading
    // -----------------------------

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
                <h1 className="text-white text-2xl font-bold">
                    Loading Product...
                </h1>
            </div>
        );
    }


    // -----------------------------
    // Error
    // -----------------------------

    if (error || !data) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
                <h1 className="text-red-500 text-2xl">
                    Something went wrong...
                </h1>
            </div>
        );
    }


    // -----------------------------
    // Safe product values
    // -----------------------------

    const price = Number(data?.price || 0);

    const discount = Number(
        data?.discountPercentage || 0
    );

    const rating = Number(
        data?.rating || 0
    );

    const stock = Number(
        data?.stock || 0
    );


    const discountAmount =
        price * (discount / 100);


    const finalPrice =
        price - discountAmount;


    const image =
        data?.images?.[2] ||
        data?.images?.[1] ||
        data?.images?.[0] ||
        data?.thumbnail;


    const brand =
        data?.brand ||
        data?.category ||
        "Product";


    const description =
        data?.description ||
        "No description available for this product.";


    return (
        <>
            <div className="min-h-screen bg-[#0B0B0F] text-white">

                <Header />


                {/* =========================
                    Breadcrumb
                ========================== */}

                <div className="max-w-7xl mx-auto pt-28 px-6">

                    <p className="text-zinc-400 text-sm">

                        Home /

                        <span className="mx-2 capitalize">
                            {data?.category}
                        </span>

                        /

                        <span className="text-white">
                            {data?.title}
                        </span>

                    </p>

                </div>


                {/* =========================
                    Main Product Section
                ========================== */}

                <section className="max-w-7xl mx-auto px-6 py-10">

                    <div className="grid lg:grid-cols-2 gap-10">


                        {/* =========================
                            Product Image
                        ========================== */}

                        <div
                            className="
                            bg-[#191A20]
                            rounded-3xl
                            border border-white/10
                            p-6
                            flex
                            flex-col
                            items-center
                            relative
                            "
                        >

                            {/* Discount Badge */}

                            {discount > 0 && (
                                <div
                                    className="
                                    absolute
                                    top-5
                                    left-5
                                    bg-red-500
                                    text-white
                                    px-3
                                    py-1.5
                                    rounded-lg
                                    text-sm
                                    font-semibold
                                    "
                                >
                                    {discount.toFixed(0)}% OFF
                                </div>
                            )}


                            {/* Product Image */}

                            <div className="h-[450px] w-full flex items-center justify-center">

                                <img
                                    src={image}
                                    alt={data?.title}
                                    className="
                                    w-full
                                    max-w-md
                                    h-[400px]
                                    object-contain
                                    transition
                                    duration-300
                                    hover:scale-105
                                    "
                                />

                            </div>


                            {/* About Product */}

                            <div className="w-full mt-4">

                                <h2 className="text-2xl font-bold mb-3">
                                    About this Product
                                </h2>

                                <p className="text-zinc-400 leading-7">
                                    {description}
                                </p>

                            </div>

                        </div>


                        {/* =========================
                            Product Information
                        ========================== */}

                        <div className="flex flex-col gap-6">


                            {/* Product Header */}

                            <div>

                                <span
                                    className="
                                    inline-block
                                    bg-indigo-600
                                    px-4
                                    py-1
                                    rounded-full
                                    text-sm
                                    "
                                >
                                    {brand}
                                </span>


                                <h1 className="text-3xl lg:text-4xl font-bold mt-4">
                                    {data?.title}
                                </h1>


                                {/* Rating + Stock */}

                                <div className="flex items-center gap-3 mt-4">

                                    <div className="flex items-center gap-1">

                                        <FaStar className="text-yellow-400" />

                                        <span>
                                            {rating.toFixed(1)}
                                        </span>

                                    </div>


                                    <span className="text-zinc-600">
                                        |
                                    </span>


                                    <span
                                        className={
                                            stock > 0
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }
                                    >
                                        {stock > 0
                                            ? `In Stock (${stock})`
                                            : "Out of Stock"
                                        }
                                    </span>

                                </div>

                            </div>


                            {/* Description */}

                            <p className="text-zinc-300 leading-7">
                                {description}
                            </p>


                            {/* =========================
                                Price Card
                            ========================== */}

                            <div
                                className="
                                bg-[#191A20]
                                rounded-2xl
                                border border-white/10
                                p-6
                                flex
                                flex-col
                                gap-5
                                "
                            >

                                {/* Price */}

                                <div className="flex items-center gap-4 flex-wrap">

                                    <h2 className="text-4xl font-bold text-indigo-400">
                                        ${finalPrice.toFixed(2)}
                                    </h2>


                                    {discount > 0 && (
                                        <>
                                            <del className="text-zinc-500">
                                                ${price.toFixed(2)}
                                            </del>

                                            <span
                                                className="
                                                bg-green-600
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                "
                                            >
                                                Save ${discountAmount.toFixed(2)}
                                            </span>
                                        </>
                                    )}

                                </div>


                                {/* Features */}

                                <div className="flex flex-wrap gap-5 text-sm text-zinc-300">

                                    <div className="flex items-center gap-2">
                                        <FaTruck className="text-green-400" />
                                        Free Shipping
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="text-blue-400" />
                                        Secure Payment
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MdVerified className="text-indigo-400" />
                                        Genuine Product
                                    </div>

                                </div>


                                {/* Buttons */}

                                <div className="flex gap-3 mt-2">

                                    <div
                                        className="flex-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <AddToCartButton product={data} />
                                    </div>


                                    <button
                                        onClick={() => navigate("/checkout")}
                                        disabled={stock <= 0}
                                        className="
                                        bg-orange-500
                                        hover:bg-orange-600
                                        disabled:bg-zinc-700
                                        disabled:cursor-not-allowed
                                        transition
                                        rounded-xl
                                        px-7
                                        py-3
                                        font-semibold
                                        "
                                    >
                                        Buy Now
                                    </button>

                                </div>

                            </div>


                            {/* =========================
                                Specifications
                            ========================== */}

                            <div
                                className="
                                bg-[#191A20]
                                border border-white/10
                                rounded-2xl
                                p-6
                                "
                            >

                                <h2 className="text-2xl font-bold mb-5">
                                    Product Specifications
                                </h2>


                                <div className="grid grid-cols-2 gap-y-4 text-sm">


                                    <p className="text-zinc-500">
                                        Brand
                                    </p>

                                    <p>
                                        {brand}
                                    </p>


                                    <p className="text-zinc-500">
                                        Category
                                    </p>

                                    <p className="capitalize">
                                        {data?.category || "N/A"}
                                    </p>


                                    <p className="text-zinc-500">
                                        Availability
                                    </p>

                                    <p
                                        className={
                                            stock > 0
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }
                                    >
                                        {stock > 0
                                            ? `In Stock (${stock})`
                                            : "Out of Stock"
                                        }
                                    </p>


                                    <p className="text-zinc-500">
                                        Rating
                                    </p>

                                    <p className="flex items-center gap-2">

                                        {rating.toFixed(1)}

                                        <FaStar className="text-yellow-400" />

                                    </p>


                                    <p className="text-zinc-500">
                                        Discount
                                    </p>

                                    <p>
                                        {discount.toFixed(0)}%
                                    </p>


                                    <p className="text-zinc-500">
                                        Shipping
                                    </p>

                                    <p className="text-green-400">
                                        {data?.shippingInformation || "Free Shipping"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================
                    Why Buy
                ========================== */}

                <section className="max-w-7xl mx-auto px-6 pb-12">

                    <div className="grid md:grid-cols-3 gap-5">


                        {/* Fast Delivery */}

                        <div
                            className="
                            bg-[#191A20]
                            border border-white/10
                            rounded-2xl
                            p-6
                            text-center
                            "
                        >

                            <FaTruck
                                className="
                                text-4xl
                                text-green-400
                                mx-auto
                                mb-4
                                "
                            />

                            <h3 className="font-semibold text-xl mb-2">
                                Fast Delivery
                            </h3>

                            <p className="text-zinc-400">
                                Free delivery on all eligible orders.
                            </p>

                        </div>


                        {/* Secure Payments */}

                        <div
                            className="
                            bg-[#191A20]
                            border border-white/10
                            rounded-2xl
                            p-6
                            text-center
                            "
                        >

                            <FaShieldAlt
                                className="
                                text-4xl
                                text-blue-400
                                mx-auto
                                mb-4
                                "
                            />

                            <h3 className="font-semibold text-xl mb-2">
                                Secure Payments
                            </h3>

                            <p className="text-zinc-400">
                                Safe and encrypted payment methods.
                            </p>

                        </div>


                        {/* Genuine Products */}

                        <div
                            className="
                            bg-[#191A20]
                            border border-white/10
                            rounded-2xl
                            p-6
                            text-center
                            "
                        >

                            <MdVerified
                                className="
                                text-4xl
                                text-indigo-500
                                mx-auto
                                mb-4
                                "
                            />

                            <h3 className="font-semibold text-xl mb-2">
                                Genuine Products
                            </h3>

                            <p className="text-zinc-400">
                                100% original products with manufacturer warranty.
                            </p>

                        </div>

                    </div>

                </section>

            </div>

            <Footer />
        </>
    );
}

export default ProductDetails;