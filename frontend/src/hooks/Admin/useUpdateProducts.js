import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../service/Admin/addProduct";


const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mobiles"],
            });
        },
    });
};

export default useUpdateProduct;