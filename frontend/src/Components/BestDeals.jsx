import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import useMobiles from "../hooks/useMobiles";
import { useMemo } from "react";
import Button from "@mui/material/Button";
import { MdOutlineDoubleArrow } from "react-icons/md";


function BestDeals() {

    const navigate = useNavigate()

    const { data, isLoading, error } = useMobiles();

    const bestDeals = useMemo(() => {
        if (!data) return [];

        return [...data]
            .sort((a, b) => b.discountPercentage - a.discountPercentage)
            .slice(0, 4);
    }, [data]);

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Something went wrong</h1>;

    return (
        <section className="bg-[#0B0B0F] py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-center">

                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-4">
                        LIMITED TIME
                    </span>
                    
                </div>

                <div className="flex justify-between mr-9 items-center mb-10">



                    <div>
                        <h2 className="text-4xl font-extrabold text-white">
                            Best Deals
                        </h2>

                        <p className="text-zinc-400 mt-2">
                            Limited Time Offers
                        </p>
                    </div>

                    <Button variant="contained" sx={{
                        backgroundColor: "#4F46E5", color: "#fff", "&:hover":
                            { backgroundColor: "#4338CA", },
                    }} onClick={() => navigate("/products")}>
                        View More  <MdOutlineDoubleArrow className="text-xl" /></Button>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {bestDeals.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default BestDeals;


