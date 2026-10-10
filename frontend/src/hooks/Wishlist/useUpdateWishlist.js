import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateWishlist from "../../service/updateWishlist";

function useUpdateWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateWishlist,

         onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        },
    });
}

export default useUpdateWishlist;