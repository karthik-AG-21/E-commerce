import { useQuery } from "@tanstack/react-query";
import getAllProducts from "../../service/Admin/getAllProducts";

function useGetAllProducts({ page = 1, limit = 8, search = "", filter = "" } = {}) {
    return useQuery({
        queryKey: ["products", page, limit, search, filter],
        queryFn: () => getAllProducts({ page, limit, search, filter }),
        placeholderData: (previousData) => previousData,
    });
}

export default useGetAllProducts;