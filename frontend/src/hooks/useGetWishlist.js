

import { useQuery } from "@tanstack/react-query";
import getWishlist from "../service/getWishlist";

function useGetWishlist(user, page = 1, limit = 5) {
    return useQuery({
        queryKey: ["wishlist", user, page, limit],
        queryFn: () => getWishlist(page, limit),
        enabled: !!user,
    });
}

export default useGetWishlist;