import mobile from "../assets/imagesMobile.jpg"
import electronics from "../assets/electronics.jpg"
import laptop from "../assets/laptop.jpg"
import tablet from "../assets/ipad.jpg"
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
        items: "explore the products",
        category: "laptops",
        image: laptop,
    },
    {
        id: 3,
        name: "Tablets",
        items: "explore the products",
        category: "tablets",
        image: tablet,
    },
    {
        id: 4,
        name: "Accessories",
        category: "mobile-accessories",
        items: "explore the products",
        image: electronics,
    },
];

function CategoryOption() {



    return (
        <>
            <div id="category" className="mx-auto  bg-[#0B0B0F]">

                <div className="py-12 flex flex-col gap-4 text-center">
                    <p className="font-bold text-white  text-4xl">Find the perfect Tech for you</p>
                </div>

                <div className="relative max-w-5xl mx-auto grid grid-cols-2 gap-6 place-items-center pb-16">
                    {categories.map((item) => (
                        <div key={item.id} className="group relative w-80 overflow-hidden rounded-2xl shadow-xl cursor-pointer">

                            <Link to={`/products/${item.category}`}>

                                <div>
                                    <img src={item.image} alt="mobiles" className="w-full h-60 bg-gray-100 object-cover " />
                                </div>

                                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-end  p-5">

                                    <h3 className="text-white text-2xl font-bold">{item.name}</h3>

                                    <p className="text-white text-sm">{item.items}</p>
                                    <p>{item.icon}</p>

                                    <Button variant="contained" sx={{
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        color: "#fff",
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        backdropFilter: "blur(12px)",
                                        WebkitBackdropFilter: "blur(12px)",
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        px: 2,
                                        py: 1,
                                        boxShadow: "none",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.10)",
                                            boxShadow: "none",
                                            border: "1px solid rgba(255,255,255,0.3)",
                                        },
                                    }}> View More  </Button>

                                </div>
                            </Link>
                        </div>


                    ))}
                </div>

            </div>
        </>
    )
}

export default CategoryOption;