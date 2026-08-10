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
    <section className="bg-[#0B0B0F] py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-extrabold text-white">
            Why Choose TechStore
          </h2>

          <p className="text-zinc-400 mt-3">
            Trusted technology. Reliable service.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item) => (

            <div
              key={item.id}
              className="bg-[#191A20] border border-white/10 rounded-2xl p-8 text-center transition-all 
              duration-300 hover:-translate-y-2 hover:border-indigo-500/40" >

              <div className="text-indigo-500 text-5xl mb-5 flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-white text-xl font-semibold">
                {item.title}
              </h3>

              <p className="text-zinc-400 mt-3">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default WhyChooseUs;
