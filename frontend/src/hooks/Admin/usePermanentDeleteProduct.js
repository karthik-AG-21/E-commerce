
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permanentDeleteProduct,  } from "../../service/Admin/permanentDeleteProduct";


function usePermanentDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => permanentDeleteProduct(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["trash"],
            });
        },
    });
}

export default usePermanentDeleteProduct;