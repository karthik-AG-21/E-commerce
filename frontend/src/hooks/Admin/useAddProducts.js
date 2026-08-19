import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../../service/Admin/addProduct";


const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mobiles"],
            });
        },
    });
};

export default useAddProduct;