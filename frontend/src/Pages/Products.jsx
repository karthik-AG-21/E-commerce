// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import WhyChooseUs from "../Components/WhyChooseUs";
// import ProductsHero from "../Components/ProductHero";
// import SearchBar from "../Components/Search";
// import ProductFilters from "../Components/ProductFilter";
// import ProductsToolbar from "../Components/ProductsToolbar";
// import ProductCards from "../Components/ProductCardinPage";

// import useProducts from "../hooks/useProducts";
// import ProductGrid from "../Components/ProductGrid";
// import useProductSearch from "../hooks/useProductSearch";
// import useProductFilter from "../hooks/useProductFilter";

// function Products() {
//     const navigate = useNavigate();
//     const { category } = useParams();

//     //for barands
//     const [brand, setBrand] = useState("all");

//     //for price range
//     const [sort, setSort] = useState("newest");



//     const { data = [], isLoading, error, } = useProducts(category);

//     const { search, setSearch, filteredProducts } = useProductSearch(data);

//     const categoryProducts = useProductFilter(filteredProducts, category);

//     const brandProducts = categoryProducts.filter((product) => {
//         if (brand === "all") return true;

//         return product.brand?.toLowerCase() === brand.toLowerCase();
//     });

//     const sortedProducts = [...brandProducts].sort((a, b) => {

//         if (sort === "low-high") {
//             return a.price - b.price;
//         }

//         if (sort === "high-low") {
//             return b.price - a.price;
//         }

//         if (sort === "rating") {
//             return b.rating - a.rating;
//         }

//         return 0;
//     });

//     const handleBrandChange = (e) => {

//         setBrand(e.target.value);
//     };

//     const handleSortChange = (e) => {
//         setSort(e.target.value);
//     };

//     const handleSearch = (e) => {
//         setSearch(e.target.value);
//     };

//     const handleCategoryChange = (e) => {
//         const value = e.target.value;

//         if (value === "all") {
//             navigate("/products");
//         } else {
//             navigate(`/products/${value}`);
//         }
//     };

//     function clearFilter(){
//         setBrand("all")
//         setSort("newest")
//         navigate("/products")
//     }




//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white">
//                 Loading...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-red-500">
//                 Something went wrong here.
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="bg-[#0B0B0F] min-h-screen">

//                 <Header />

//                 <ProductsHero />

//                 <SearchBar value={search} onChange={handleSearch}/>

//                 <ProductFilters
//                     category={category} onCategoryChange={handleCategoryChange} 
//                     brand={brand} onBrandChange={handleBrandChange}    
//                     sort={sort} onSortChange={handleSortChange}  />

//                 <ProductsToolbar  clearFilter={clearFilter}/>


//                 <ProductGrid products={sortedProducts} />

//             </div>

//             <WhyChooseUs />

//             <Footer />
//         </>
//     );
// }

// export default Products;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import WhyChooseUs from "../Components/WhyChooseUs";
import ProductsHero from "../Components/ProductHero";
import SearchBar from "../Components/Search";
import ProductFilters from "../Components/ProductFilter";
import ProductsToolbar from "../Components/ProductsToolbar";
import ProductGrid from "../Components/ProductGrid";

import useProducts from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import useGetWishlist from "../hooks/useGetWishlist";
import { setWishlistProductIds } from "../redux/wishlistSlice";

function Products() {
    const navigate = useNavigate();
    const { category } = useParams();

    const dispatch = useDispatch();
    const user = localStorage.getItem("userId");

    const { data: wishlistResponse } = useGetWishlist(user, 1, 5);

    useEffect(() => {
        if (Array.isArray(wishlistResponse?.wishlistProductIds)) {
            dispatch(
                setWishlistProductIds(
                    wishlistResponse.wishlistProductIds
                )
            );
        }
    }, [wishlistResponse?.wishlistProductIds, dispatch]);

    const [brand, setBrand] = useState("all");
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);

    const limit = 12;

    // Debounce search to avoid calling the API on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    // Reset page when category changes
    useEffect(() => {
        setPage(1);
    }, [category]);

    // Fetch filtered products from backend
    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useProducts({
        category: category || "all",
        search: debouncedSearch,
        brand,
        sort,
        page,
        limit,
    });

    // Backend response: { success, data, pagination }
    const products = data?.data ?? [];
    const pagination = data?.pagination;

    const handleBrandChange = (e) => { setBrand(e.target.value); setPage(1) };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;

        setPage(1);
        navigate(
            value === "all"
                ? "/products"
                : `/products/${value}`
        );
    };

    const clearFilter = () => {
        setSearch("");
        setDebouncedSearch("");
        setBrand("all");
        setSort("newest");
        setPage(1);
        navigate("/products");
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#0B0B0F] px-4 text-center text-white">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-red-500">
                Something went wrong here.
            </div>
        );
    }



    return (
        <>
            <div className="min-h-screen w-full overflow-x-clip bg-[#0B0B0F]">
                <Header />

                <ProductsHero />

                <SearchBar value={search} onChange={handleSearch} />

                <ProductFilters category={category} onCategoryChange={handleCategoryChange} brand={brand}
                    onBrandChange={handleBrandChange} sort={sort} onSortChange={handleSortChange} />

                <ProductsToolbar clearFilter={clearFilter} />

                {isFetching && (
                    <p className="text-center text-gray-400 py-3">Updating products...</p>
                )}

                {products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <p className="text-center text-white py-12">
                        No products found.
                    </p>
                )}

                {/* Pagination */}

                {/* Responsive Pagination */}
                {pagination && pagination.totalPages > 0 && (
                    <div className="flex w-full flex-wrap items-center justify-center gap-3 px-4 py-8 text-white sm:gap-4 sm:py-10">
                        <button
                            disabled={!pagination.hasPrevPage}
                            onClick={() => setPage((p) => p - 1)}
                            className="rounded-lg border border-gray-600 bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                        >
                            Previous
                        </button>

                        <span className="text-center text-sm text-gray-300 sm:text-base">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>

                        <button
                            disabled={!pagination.hasNextPage}
                            onClick={() => setPage((p) => p + 1)}
                            className="rounded-lg border border-gray-600 bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>

            <WhyChooseUs />
            <Footer />
        </>
    );
}

export default Products;