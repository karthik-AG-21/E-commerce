
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/#category" },
        { name: "Contact", path: "/#contact" },
    ];

    const categories = [
        { name: "All Products", path: "/products" },
        { name: "Smartphones", path: "/products/smartphones" },
        { name: "Laptops", path: "/products/laptops" },
        { name: "Tablets", path: "/products/tablets" },
        { name: "Accessories", path: "/products/mobile-accessories" },
    ];

    const linkClass =
        "cursor-pointer text-sm text-gray-400 transition-colors hover:text-white sm:text-base";

    return (
        <footer className="w-full overflow-hidden bg-zinc-900 py-8 text-white sm:py-10">

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-5 text-center 
            min-[420px]:grid-cols-2 sm:px-6 md:grid-cols-4 md:text-left">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold">TechStore</h2>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400 sm:text-base">
                        Your trusted place for electronics.
                    </p>
                </div>

                {/* Quick links */}
                <div>
                    <h3 className="mb-3 font-bold">Quick Links</h3>

                    <ul className="space-y-2">
                        {quickLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    type="button"
                                    onClick={() => navigate(link.path)}
                                    className={linkClass}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="mb-3 font-bold">Categories</h3>

                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.name}>
                                <button
                                    type="button"
                                    onClick={() => navigate(category.path)}
                                    className={linkClass}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div id="contact">
                    <h3 className="mb-3 font-bold">Contact</h3>

                    <div className="space-y-2 break-words text-sm leading-relaxed text-gray-400 sm:text-base">
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:support@techstore.com"
                                className="transition-colors hover:text-white"
                            >
                                support@techstore.com
                            </a>
                        </p>

                        <p>
                            Phone:{" "}
                            <a
                                href="tel:+919999999999"
                                className="transition-colors hover:text-white"
                            >
                                +91 99999 99999
                            </a>
                        </p>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="mx-auto mt-8 border-t border-gray-700 px-4 pt-5 text-center text-xs text-gray-500 sm:mt-10 sm:text-sm">
                © 2026 TechStore. All rights reserved.
            </div>

        </footer>
    );
}

export default Footer;
