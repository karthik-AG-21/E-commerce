
import mobile from "../assets/imagesMobile.jpg";
import electronics from "../assets/electronics.jpg";
import laptop from "../assets/laptop.jpg";
import tablet from "../assets/ipad.jpg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const categories = [
    {
        id: 1,
        name: "Mobiles",
        items: "120+ Products",
        category: "smartphones",
        image: mobile,
    },
    {
        id: 2,
        name: "Laptops",
        items: "Explore the products",
        category: "laptops",
        image: laptop,
    },
    {
        id: 3,
        name: "Tablets",
        items: "Explore the products",
        category: "tablets",
        image: tablet,
    },
    {
        id: 4,
        name: "Accessories",
        items: "Explore the products",
        category: "mobile-accessories",
        image: electronics,
    },
];

function CategoryOption() {
    return (
        <section id="category" className="w-full overflow-hidden bg-[#0B0B0F]">

            {/* Section heading */}
            <div className="flex flex-col gap-3 px-4 py-8 text-center sm:py-12">
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                    Find the perfect Tech for you
                </h2>
            </div>

            {/* Category cards */}
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 justify-items-center gap-4 px-4 pb-10 min-[360px]:grid-cols-2 sm:gap-6 sm:px-6 sm:pb-16">

                {categories.map((item) => (
                    <Link
                        key={item.id}
                        to={`/products/${item.category}`}
                        className="group relative block w-full min-w-0 max-w-[320px] overflow-hidden rounded-2xl shadow-xl sm:max-w-none"
                    >
                        {/* Category image */}
                        <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-60"
                        />

                        {/* Image overlay */}
                        <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 sm:p-5">

                            <h3 className="text-right text-lg font-bold text-white sm:text-2xl">
                                {item.name}
                            </h3>

                            <p className="mt-1 text-right text-[11px] text-zinc-200 sm:text-sm">
                                {item.items}
                            </p>

                            <Button
                                variant="contained"
                                sx={{
                                    mt: 1.5,
                                    minWidth: 0,
                                    minHeight: { xs: 34, sm: 40 },
                                    px: { xs: 1.5, sm: 2 },
                                    py: { xs: 0.5, sm: 1 },
                                    fontSize: { xs: "12px", sm: "14px" },
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                    color: "#fff",
                                    border: "1px solid rgba(255,255,255,0.25)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)",
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    boxShadow: "none",
                                    pointerEvents: "none",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.15)",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                View More
                            </Button>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    );
}

export default CategoryOption;
