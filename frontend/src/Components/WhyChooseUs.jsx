
import { FaHeadset, FaLock, FaShieldAlt, FaTruck } from "react-icons/fa";

function WhyChooseUs() {
    const features = [
        {
            id: 1,
            icon: <FaTruck />,
            title: "Free Shipping",
            description: "Fast & free delivery on eligible orders.",
        },
        {
            id: 2,
            icon: <FaLock />,
            title: "Secure Payments",
            description: "100% secure checkout with trusted payment gateways.",
        },
        {
            id: 3,
            icon: <FaShieldAlt />,
            title: "Genuine Products",
            description: "Authentic products with official warranty.",
        },
        {
            id: 4,
            icon: <FaHeadset />,
            title: "24/7 Support",
            description: "Our team is always here whenever you need help.",
        },
    ];

    return (
        <section className="w-full overflow-hidden bg-[#0B0B0F] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="mb-8 text-center sm:mb-12 lg:mb-14">
                    <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                        Why Choose TechStore
                    </h2>

                    <p className="mt-3 text-sm text-zinc-400 sm:text-base">
                        Trusted technology. Reliable service.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
                    {features.map((item) => (
                        <div
                            key={item.id}
                            className="flex min-w-0 flex-col items-center rounded-2xl border border-white/10 bg-[#191A20] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 sm:p-6 lg:p-8"
                        >
                            <div className="mb-4 flex justify-center text-4xl text-indigo-500 sm:mb-5 sm:text-5xl">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-semibold text-white sm:text-xl">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;
