import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate()

  return (
    <footer className="bg-zinc-900 text-white py-10">

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">


        <div>
          <h2 className="text-2xl font-bold">TechStore</h2>
          <p className="text-gray-400 mt-2"> Your trusted place for electronics.</p>
        </div>


        <div>
          <h3 className="font-bold mb-3">Quick Links </h3>

          <ul className="text-gray-400 space-y-2">
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>

        </div>

        <div>
          <h3 className="font-bold mb-3">
            Categories
          </h3>

          <ul className="text-gray-400 space-y-2">
            <li onClick={()=>navigate("/products")} >All Products</li>
            <li onClick={()=>navigate("/products/smartphones")}>Smart Phones</li>
            <li onClick={()=>navigate("/products/laptops")}>Laptops</li>
            <li onClick={()=>navigate("/products/tablets")}>Tablets</li>
            <li onClick={()=>navigate("/products/mobile-accessories")}>Acessories</li>
          </ul>
        </div>


        <div>
          <h3 className="font-bold mb-3"> Contact</h3>
          <p className="text-gray-400">Email: support@techstore.com</p>
          <p className="text-gray-400">Phone: +91 99999 99999</p>
        </div>


      </div>


      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-5">
        © 2026 TechStore
      </div>

    </footer>
  )
}

export default Footer;
