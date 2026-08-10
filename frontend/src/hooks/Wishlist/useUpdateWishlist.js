import { useMutation } from "@tanstack/react-query";
import updateWishlist from "../../service/updateWishlist";

function useUpdateWishlist() {

    return useMutation({
        mutationFn: updateWishlist,
    });
}

export default useUpdateWishlist;