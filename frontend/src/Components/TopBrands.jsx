import { Link } from "react-router-dom";
import apple from "../assets/brands/apple.svg";
import samsung from "../assets/brands/samsung.svg";
import dell from "../assets/brands/dell.svg";
import lenovo from "../assets/brands/lenovo.svg";
import asus from "../assets/brands/asus.svg";
import vivo from "../assets/brands/vivo.svg";
import oppo from "../assets/brands/oppo.svg";
import huawei from "../assets/brands/huawei.svg";

const brands = [

    {
        id: 1,
        name: "Apple",
        image: apple,
    },
    {
        id: 2,
        name: "Samsung",
        image: samsung,
    },
    {
        id: 3,
        name: "Dell",
        image: dell,
    },
    {
        id: 4,
        name: "Lenovo",
        image: lenovo,
    },
    {
        id: 5,
        name: "Asus",
        image: asus,
    },
    {
        id: 6,
        name: "Vivo",
        image: vivo,
    },
    {
        id: 7,
        name: "Oppo",
        image: oppo,
    },
    {
        id: 8,
        name: "Huawei",
        image: huawei,
    },
];

function TopBrands() {
    return (
        <section className="bg-[#0B0B0F] py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">

                    <h2 className="text-4xl font-extrabold text-white">Shop By Top Brands</h2>

                    <p className="text-zinc-400 mt-3">Explore products from trusted brands.</p>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-4  gap-6">

                    {brands.map((brand) => ( 
                        <Link key={brand.id} to={`/products?brand=${brand.name}`}

                            className="bg-[#191A20] border  border-white/10  rounded-2xl h-32  flex
                             flex-col justify-center items-center  gap-3  text-white transition-all duration-300 *: hover:-translate-y-1
                               hover:border-indigo-500/40  hover:bg-[#23242C]">

                            <img src={brand.image} alt={brand.name}
                                className="w-15 h-15 object-contain bg-white rounded-full p-1 "/>

                            <p className="text-lg font-semibold"> {brand.name}</p>
                        </Link>
                    ))}
                </div>

            </div>

        </section>
    );
}

export default TopBrands;