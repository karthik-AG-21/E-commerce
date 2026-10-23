import { useQuery } from "@tanstack/react-query";
import getCart from "../service/getCart";

function useGetCart(user, page = 1, limit = 5) {
    return useQuery({
        queryKey: ["cart", user, page, limit],
        queryFn: () => getCart(page, limit),
        enabled: !!user,
    });
}

export default useGetCart;