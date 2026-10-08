import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import WhyChooseUs from "../Components/WhyChooseUs";
import ProductsHero from "../Components/ProductHero";
import SearchBar from "../Components/Search";
import ProductFilters from "../Components/ProductFilter";
import ProductsToolbar from "../Components/ProductsToolbar";
import ProductCards from "../Components/ProductCardinPage";

import useProducts from "../hooks/useProducts";
import ProductGrid from "../Components/ProductGrid";
import useProductSearch from "../hooks/useProductSearch";
import useProductFilter from "../hooks/useProductFilter";

function Products() {
    const navigate = useNavigate();
    const { category } = useParams();

    //for barands
    const [brand, setBrand] = useState("all");

    //for price range
    const [sort, setSort] = useState("newest");



    const { data = [], isLoading, error, } = useProducts(category);

    const { search, setSearch, filteredProducts } = useProductSearch(data);

    const categoryProducts = useProductFilter(filteredProducts, category);

    const brandProducts = categoryProducts.filter((product) => {
        if (brand === "all") return true;

        return product.brand?.toLowerCase() === brand.toLowerCase();
    });

    const sortedProducts = [...brandProducts].sort((a, b) => {

        if (sort === "low-high") {
            return a.price - b.price;
        }

        if (sort === "high-low") {
            return b.price - a.price;
        }

        if (sort === "rating") {
            return b.rating - a.rating;
        }

        return 0;
    });

    const handleBrandChange = (e) => {
         
        setBrand(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;

        if (value === "all") {
            navigate("/products");
        } else {
            navigate(`/products/${value}`);
        }
    };

    function clearFilter(){
        setBrand("all")
        setSort("newest")
        navigate("/products")
    }




    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white">
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
            <div className="bg-[#0B0B0F] min-h-screen">

                <Header />

                <ProductsHero />

                <SearchBar value={search} onChange={handleSearch}/>

                <ProductFilters
                    category={category} onCategoryChange={handleCategoryChange} 
                    brand={brand} onBrandChange={handleBrandChange}    
                    sort={sort} onSortChange={handleSortChange}  />

                <ProductsToolbar  clearFilter={clearFilter}/>


                <ProductGrid products={sortedProducts} />

            </div>

            <WhyChooseUs />

            <Footer />
        </>
    );
}

export default Products;