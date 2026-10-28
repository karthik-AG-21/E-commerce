
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
    { id: 1, name: "Apple", image: apple },
    { id: 2, name: "Samsung", image: samsung },
    { id: 3, name: "Dell", image: dell },
    { id: 4, name: "Lenovo", image: lenovo },
    { id: 5, name: "Asus", image: asus },
    { id: 6, name: "Vivo", image: vivo },
    { id: 7, name: "Oppo", image: oppo },
    { id: 8, name: "Huawei", image: huawei },
];

function TopBrands() {
    return (
        <section className="w-full overflow-hidden bg-[#0B0B0F] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section heading */}
                <div className="mb-8 text-center sm:mb-12">
                    <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                        Shop By Top Brands
                    </h2>

                    <p className="mt-3 text-sm text-zinc-400 sm:text-base">
                        Explore products from trusted brands.
                    </p>
                </div>

                {/* Brand cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/products?brand=${encodeURIComponent(brand.name)}`}
                            className="flex h-28 min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#191A20] text-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-[#23242C] sm:h-32 sm:gap-3"
                        >
                            <img
                                src={brand.image}
                                alt={`${brand.name} logo`}
                                loading="lazy"
                                className="h-11 w-11 rounded-full bg-white p-1 object-contain sm:h-14 sm:w-14"
                            />

                            <p className="text-sm font-semibold sm:text-lg">
                                {brand.name}
                            </p>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default TopBrands;
