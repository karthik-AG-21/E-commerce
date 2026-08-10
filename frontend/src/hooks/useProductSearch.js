import { useState } from "react";

function useProductSearch(products = []) {
    const [search, setSearch] = useState("");

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
    );

    return { search, setSearch, filteredProducts };
}

export default useProductSearch;