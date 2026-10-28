
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreProduct } from "../../service/Admin/restoreProduct";


function useRestoreProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => restoreProduct(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["trash"],
            });

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}

export default useRestoreProduct;

