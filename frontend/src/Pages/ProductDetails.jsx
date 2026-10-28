
import { useNavigate, useParams } from "react-router-dom";
import useProductById from "../hooks/useProductById";
import { FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

import Footer from "../Components/Footer";
import AddToCartButton from "../Components/AddToCartButton";
import Header from "../Components/Header";

function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, isLoading, error } = useProductById(id);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0B0B0F] px-4 text-center">
                <h1 className="text-xl font-bold text-white sm:text-2xl">
                    Loading Product...
                </h1>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0B0B0F] px-4 text-center">
                <h1 className="text-xl text-red-400 sm:text-2xl">
                    Something went wrong...
                </h1>
            </div>
        );
    }

    const price = Number(data?.price || 0);
    const discount = Number(data?.discountPercentage || 0);
    const rating = Number(data?.rating || 0);
    const stock = Number(data?.stock || 0);

    const discountAmount = price * (discount / 100);
    const finalPrice = price - discountAmount;

    const image =
        data?.images?.[2] ||
        data?.images?.[1] ||
        data?.images?.[0] ||
        data?.thumbnail;

    const brand = data?.brand || data?.category || "Product";
    const description =
        data?.description || "No description available for this product.";

    return (
        <>
            <div className="min-h-screen w-full overflow-x-clip bg-[#0B0B0F] text-white">
                <Header />

                {/* Breadcrumb */}
                <div className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6">
                    <p className="break-words text-xs leading-6 text-zinc-400 sm:text-sm">
                        <span
                            onClick={() => navigate("/")}
                            className="cursor-pointer hover:text-white"
                        >
                            Home
                        </span>
                        <span className="mx-2">/</span>
                        <span className="capitalize">{data?.category}</span>
                        <span className="mx-2">/</span>
                        <span className="text-white">{data?.title}</span>
                    </p>
                </div>

                {/* Main Product Section */}
                <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
                    <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">

                        {/* Product Image and About */}
                        <div className="flex min-w-0 flex-col items-center rounded-2xl border border-white/10 bg-[#191A20] p-4 sm:rounded-3xl sm:p-6">
                            {discount > 0 && (
                                <div className="relative z-10 mb-3 self-start rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white sm:text-sm">
                                    {discount.toFixed(0)}% OFF
                                </div>
                            )}

                            <div className="flex h-[280px] w-full min-w-0 items-center justify-center sm:h-[380px] lg:h-[450px]">
                                {image ? (
                                    <img
                                        src={image}
                                        alt={data?.title || "Product"}
                                        className="h-full w-full max-w-md object-contain transition duration-300 hover:scale-105"
                                    />
                                ) : (
                                    <p className="text-sm text-zinc-500">
                                        Image unavailable
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 w-full">
                                <h2 className="mb-3 text-xl font-bold sm:text-2xl">
                                    About this Product
                                </h2>
                                <p className="break-words text-sm leading-7 text-zinc-400 sm:text-base">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
                            <div className="min-w-0">
                                <span className="inline-block max-w-full break-words rounded-full bg-indigo-600 px-4 py-1 text-sm">
                                    {brand}
                                </span>

                                <h1 className="mt-4 break-words text-2xl font-bold sm:text-3xl lg:text-4xl">
                                    {data?.title}
                                </h1>

                                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm sm:text-base">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="shrink-0 text-yellow-400" />
                                        <span>{rating.toFixed(1)}</span>
                                    </div>

                                    <span className="text-zinc-600">|</span>

                                    <span
                                        className={
                                            stock > 0
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }
                                    >
                                        {stock > 0
                                            ? `In Stock (${stock})`
                                            : "Out of Stock"}
                                    </span>
                                </div>
                            </div>

                            <p className="break-words text-sm leading-7 text-zinc-300 sm:text-base">
                                {description}
                            </p>

                            {/* Price Card */}
                            <div className="flex min-w-0 flex-col gap-5 rounded-2xl border border-white/10 bg-[#191A20] p-4 sm:p-6">
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                    <h2 className="text-3xl font-bold text-indigo-400 sm:text-4xl">
                                        ${finalPrice.toFixed(2)}
                                    </h2>

                                    {discount > 0 && (
                                        <>
                                            <del className="text-sm text-zinc-500 sm:text-base">
                                                ${price.toFixed(2)}
                                            </del>

                                            <span className="rounded-full bg-green-600 px-3 py-1 text-xs sm:text-sm">
                                                Save ${discountAmount.toFixed(2)}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Features */}
                                <div className="flex flex-col gap-3 text-sm text-zinc-300 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:gap-4">
                                    <div className="flex items-center gap-2">
                                        <FaTruck className="shrink-0 text-green-400" />
                                        Free Shipping
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaShieldAlt className="shrink-0 text-blue-400" />
                                        Secure Payment
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MdVerified className="shrink-0 text-indigo-400" />
                                        Genuine Product
                                    </div>
                                </div>

                                {/* Purchase Buttons */}
                                <div className="mt-2 flex min-w-0 flex-col gap-3 min-[400px]:flex-row">
                                    <div
                                        className="w-full min-w-0 flex-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <AddToCartButton product={data} />
                                    </div>

                                    <button
                                        onClick={() => navigate("/checkout")}
                                        disabled={stock <= 0}
                                        className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-zinc-700 min-[400px]:w-auto min-[400px]:shrink-0 min-[400px]:px-7"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            {/* Product Specifications */}
                            <div className="min-w-0 rounded-2xl border border-white/10 bg-[#191A20] p-4 sm:p-6">
                                <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                                    Product Specifications
                                </h2>

                                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-x-3 gap-y-4 text-xs sm:text-sm">
                                    <p className="text-zinc-500">Brand</p>
                                    <p className="break-words">{brand}</p>

                                    <p className="text-zinc-500">Category</p>
                                    <p className="break-words capitalize">
                                        {data?.category || "N/A"}
                                    </p>

                                    <p className="text-zinc-500">Availability</p>
                                    <p
                                        className={
                                            stock > 0
                                                ? "break-words text-green-400"
                                                : "break-words text-red-400"
                                        }
                                    >
                                        {stock > 0
                                            ? `In Stock (${stock})`
                                            : "Out of Stock"}
                                    </p>

                                    <p className="text-zinc-500">Rating</p>
                                    <p className="flex items-center gap-2">
                                        {rating.toFixed(1)}
                                        <FaStar className="shrink-0 text-yellow-400" />
                                    </p>

                                    <p className="text-zinc-500">Discount</p>
                                    <p>{discount.toFixed(0)}%</p>

                                    <p className="text-zinc-500">Shipping</p>
                                    <p className="break-words text-green-400">
                                        {data?.shippingInformation || "Free Shipping"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Buy */}
                <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-12">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-[#191A20] p-5 text-center sm:p-6">
                            <FaTruck className="mx-auto mb-4 text-4xl text-green-400" />
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                                Fast Delivery
                            </h3>
                            <p className="text-sm text-zinc-400 sm:text-base">
                                Free delivery on all eligible orders.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#191A20] p-5 text-center sm:p-6">
                            <FaShieldAlt className="mx-auto mb-4 text-4xl text-blue-400" />
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                                Secure Payments
                            </h3>
                            <p className="text-sm text-zinc-400 sm:text-base">
                                Safe and encrypted payment methods.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#191A20] p-5 text-center sm:col-span-2 sm:p-6 md:col-span-1">
                            <MdVerified className="mx-auto mb-4 text-4xl text-indigo-500" />
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                                Genuine Products
                            </h3>
                            <p className="text-sm text-zinc-400 sm:text-base">
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
