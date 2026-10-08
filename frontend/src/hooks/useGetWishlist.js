import { useQuery } from "@tanstack/react-query";
import getWishlist from "../service/getWishlist";

function useGetWishlist() {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: () => getWishlist()
    });
}

export default useGetWishlist;