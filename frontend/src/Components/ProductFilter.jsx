import { all } from "axios";

function ProductFilters({ category, onCategoryChange, brand, onBrandChange, sort, onSortChange }) {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-8">

            <div className="flex flex-wrap gap-4">

                {/* Category */}

                <select value={category || "all"}  onChange={onCategoryChange}
                   className=" border border-white/10 rounded-xl px-5 py-3 outline-none
                        bg-[#191A20]  text-white  focus:border-indigo-500">
                    
                    <option value="all">All Categories</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="tablets">Tablets</option>
                    <option value="mobile-accessories"> Accessories </option>

                </select>

                {/* Brand */}

                <select
                    value={brand} onChange={onBrandChange}
                    className="  bg-[#191A20] border  border-white/10  text-white 
                     rounded-xl px-5 py-3 outline-none focus:border-indigo-500">

                    <option value="all" >All Brands</option>
                    <option>Apple</option>
                    <option>Samsung</option>
                    <option>Realme</option>
                    <option>Lenovo</option>
                    <option>Asus</option>
                </select>

                {/* Sort */}

                <select
                    value={sort}
                    onChange={onSortChange}
                    className=" bg-[#191A20] border  border-white/10  text-white rounded-xl
                     px-5 py-3 outline-none  focus:border-indigo-500">
                    <option value="newest">Newest</option>
                    <option value="low-high">Price : Low → High</option>
                    <option value="high-low">Price : High → Low</option>
                    <option value="rating">Highest Rated</option>
                </select>

            </div>

        </div>
    );
}

export default ProductFilters;