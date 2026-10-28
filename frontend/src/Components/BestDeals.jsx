
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import useMobiles from "../hooks/useMobiles";
import { useMemo } from "react";
import Button from "@mui/material/Button";
import { MdOutlineDoubleArrow } from "react-icons/md";

function BestDeals() {
    const navigate = useNavigate();

    const { data, isLoading, error } = useMobiles();

    const bestDeals = useMemo(() => {
        if (!data) return [];

        return [...data]
            .sort(
                (a, b) =>
                    (b.discountPercentage ?? 0) -
                    (a.discountPercentage ?? 0)
            )
            .slice(0, 4);
    }, [data]);

    if (isLoading) {
        return (
            <section className="bg-[#0B0B0F] px-4 py-10 text-center text-white">
                Loading deals...
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-[#0B0B0F] px-4 py-10 text-center text-white">
                Something went wrong.
            </section>
        );
    }

    return (
        <section className="w-full overflow-hidden bg-[#0B0B0F] py-10 sm:py-14 lg:py-20">

            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Limited time badge */}
                <div className="mb-5 flex justify-center sm:mb-6">
                    <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-600/20 px-4 py-2 text-xs font-semibold text-indigo-300 sm:text-sm">
                        LIMITED TIME
                    </span>
                </div>

                {/* Heading and View More */}
                <div className="mb-7 flex items-center justify-between gap-3 sm:mb-10">

                    <div className="min-w-0">
                        <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                            Best Deals
                        </h2>

                        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                            Limited Time Offers
                        </p>
                    </div>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#4F46E5",
                            color: "#fff",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            minWidth: 0,
                            borderRadius: "10px",
                            px: { xs: 1.5, sm: 2 },
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: "12px", sm: "14px" },
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#4338CA",
                            },
                        }}
                        onClick={() => navigate("/products")}
                    >
                        View More
                        <MdOutlineDoubleArrow className="ml-1 text-lg sm:text-xl" />
                    </Button>
                </div>

                {/* Responsive product grid */}


                {/* Responsive product grid */}

                {/* Responsive product grid */}
                <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
                    {bestDeals.map((product) => (
                        <div
                            key={product._id ?? product.id}
                            className="flex w-full min-w-0 justify-center min-[560px]:justify-stretch"
                        >
                            <div className="w-full max-w-[320px] min-w-0 min-[560px]:max-w-none">
                                <ProductCard product={product} />
                            </div>
                        </div>
                    ))}
                </div>




            </div>
        </section>
    );
}

export default BestDeals;
