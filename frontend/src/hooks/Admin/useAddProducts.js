
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addProduct from "../../service/Admin/addProduct";
import { toast } from "react-toastify";

function useAddProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,

        onSuccess: (data) => {
            toast.success(data.message || "Product added successfully");

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to add product"
            );
        },
    });
}

export default useAddProduct;
