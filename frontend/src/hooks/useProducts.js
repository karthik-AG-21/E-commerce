import { useQuery } from "@tanstack/react-query";
import getProducts from "../service/getProducts";




function useProducts(filters = {}) {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => getProducts(filters),
        placeholderData: (previousData) => previousData,
    });
}

export default useProducts;