import { useQuery } from "@tanstack/react-query";
import getWishlist from "../service/getWishlist";

function useGetWishlist(userId) {
    return useQuery({
        queryKey: ["wishlist", userId],
        queryFn: () => getWishlist(userId),
        enabled: !!userId,
    });
}

export default useGetWishlist;