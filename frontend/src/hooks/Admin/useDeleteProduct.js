import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../service/Admin/addProduct";

const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mobiles"],
            });
        },
    });
};

export default useDeleteProduct;