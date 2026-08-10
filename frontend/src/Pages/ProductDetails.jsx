


import { useNavigate, useParams } from "react-router-dom";
import useProductById from "../hooks/useProductById";
import { FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Footer from "../Components/Footer";
import AddToCartButton from "../Components/AddToCartButton";
import Header from "../Components/Header";

function ProductDetails() {

    const naviagte = useNavigate()

    const { id } = useParams();

    const { data, isLoading, error } = useProductById(id);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex justify-center items-center">
                <h1 className="text-white text-2xl font-bold">
                    Loading Product...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex justify-center items-center">
                <h1 className="text-red-500 text-2xl">
                    Something went wrong...
                </h1>
            </div>
        );
    }

    const discountAmount =
        (data.price * data.discountPercentage) / 100;

    const finalPrice = Math.ceil(
        data.price - discountAmount
    );

    return (
        <>
            <div className="min-h-screen bg-[#0B0B0F] text-white">

                <Header />


                <div className="max-w-7xl mx-auto pt-28 px-6">

                    <p className="text-zinc-400 text-sm">
                        Home /<span className="mx-2 capitalize">{data.category} </span>
                        /<span className="text-white">{data.title}</span>
                    </p>

                </div>

               

                <section className="max-w-7xl mx-auto px-6 py-10">

                    <div className="grid lg:grid-cols-2 gap-12">

                        

                        <div
                            className="bg-[#191A20] rounded-3xl border border-white/10 p-6 gap-10 flex
                            flex-col justify-start items-center relative  h-full pt-16">

                            <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 
                            rounded-xl font-semibold ">
                            {Math.round(data.discountPercentage)}% OFF </div>

                            <img src={ data.images[2] || data.images[1] || data.images[0]} alt={data.title}
                                  className="mt-8 w-full max-w-md h-[400px] object-contain transition duration-300
                                   hover:scale-105 "/>


                            <section className="max-w-7xl mx-auto  pb-8 mt-6">

                                <div
                                    className="bg-[#191A20] border border-white/10 rounded-2xl p-8 " >

                                    <h2 className="text-3xl font-bold mb-6">About this Product</h2>

                                    <p className=" text-zinc-300 leading-8 "> {data.description}</p>

                                </div>

                            </section>

                        </div>
                        

                        <div className="flex flex-col gap-6">

                            <div>

                                <span className="  bg-indigo-600 px-4 py-1 rounded-full text-sm ">
                                   {data.brand} </span>

                                <h1 className="text-4xl font-bold mt-5"> {data.title} </h1>

                                <div className=" flex items-center gap-3 mt-4 ">

                                    <div className="flex items-center gap-1">

                                        <FaStar className="text-yellow-400" />

                                        <span> {data.rating} </span>

                                    </div>

                                    <span className="text-zinc-500"> | </span>

                                    <span className="text-green-400"> In Stock ({data.stock}) </span>

                                </div>

                            </div>

                           

                            <p
                                className="
                                text-zinc-300
                                leading-8
                                "
                            >
                                {data.description}
                            </p>

                            {/* Price Card */}

                            <div
                                className="
                                bg-[#191A20]
                                rounded-2xl
                                border
                                border-white/10
                                p-6
                                flex
                                flex-col
                                gap-4
                                "
                            >

                                <div className="flex items-center gap-4">

                                    <h2
                                        className="
                                        text-4xl
                                        font-bold
                                        text-indigo-400
                                        "
                                    >
                                        ${finalPrice}
                                    </h2>

                                    <del className="text-zinc-500">

                                        ${data.price}

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
                                        Save ${Math.ceil(discountAmount)}
                                    </span>

                                </div>

                                <div className="flex gap-6 text-sm">

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

                                <div className="flex gap-4 mt-3">

                                    <div className="flex-1">

                                        <AddToCartButton product={data} />

                                    </div>

                                    <button onClick={()=>naviagte("/checkout")}
                                        className="
                                        bg-orange-500
                                        hover:bg-orange-600
                                        transition
                                        rounded-xl
                                        px-8
                                        py-3
                                        font-semibold
                                        "
                                    >
                                        Buy Now
                                    </button>

                                </div>

                            </div>

                            {/* Product Specifications */}

                            <div
                                className="
                                bg-[#191A20]
                                border
                                border-white/10
                                rounded-2xl
                                p-6
                                "
                            >

                                <h2 className="text-2xl font-bold mb-5">
                                    Product Specifications
                                </h2>

                                <div className="grid grid-cols-2 gap-y-4 text-zinc-300">

                                    <p className="text-zinc-500">
                                        Brand
                                    </p>

                                    <p>
                                        {data.brand}
                                    </p>

                                    <p className="text-zinc-500">
                                        Category
                                    </p>

                                    <p className="capitalize">
                                        {data.category}
                                    </p>

                                    <p className="text-zinc-500">
                                        Availability
                                    </p>

                                    <p className="text-green-400">
                                        In Stock ({data.stock})
                                    </p>

                                    <p className="text-zinc-500">
                                        Rating
                                    </p>

                                    <p className="flex items-center gap-2">
                                        {data.rating}
                                        <FaStar className="text-yellow-400" />
                                    </p>

                                    <p className="text-zinc-500">
                                        Discount
                                    </p>

                                    <p>
                                        {Math.round(data.discountPercentage)}%
                                    </p>

                                    <p className="text-zinc-500">
                                        Shipping
                                    </p>

                                    <p className="text-green-400">
                                        Free Shipping
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* About Product */}



                {/* Why Buy */}

                <section className="max-w-7xl mx-auto px-6 pb-12">

                    <div className="grid md:grid-cols-3 gap-6">

                        <div
                            className="
                            bg-[#191A20]
                            border
                            border-white/10
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

                        <div
                            className="
                            bg-[#191A20]
                            border
                            border-white/10
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

                            <h3 className="font-semibold text-xl mb-2">Secure Payments </h3>

                            <p className="text-zinc-400">Safe and encrypted payment methods.</p>

                        </div>

                        <div className="  bg-[#191A20]  border border-white/10 rounded-2xl p-6 text-center">
                            
                            <MdVerified className="text-4xl  text-indigo-500  mx-auto  mb-4 "/>
                                
                            <h3 className="font-semibold text-xl mb-2">Genuine Products </h3>

                            <p className="text-zinc-400"> 100% original products with manufacturer warranty.</p>

                        </div>

                    </div>

                </section>

            </div>

            <Footer />

        </>
    );
}

export default ProductDetails;