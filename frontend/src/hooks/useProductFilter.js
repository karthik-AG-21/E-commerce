import { useMemo } from "react";

function useProductFilter(products = [], category) {

    const filteredProducts = useMemo(() => {

        if (!category || category === "all") {
            return products;
        }

        return products.filter((product) =>
            product.category === category
        );

    }, [products, category]);


    return filteredProducts;
}

export default useProductFilter;