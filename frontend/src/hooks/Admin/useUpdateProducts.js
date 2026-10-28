import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../service/Admin/addProduct";
import { toast } from "react-toastify";

const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            toast.success("Product updated successfully");
        },

        onError: (error) => {
            console.log("Update product error:", error);
            console.log("Response data:", error.response?.data);
            console.log("Status:", error.response?.status);


            toast.error(
                error.response?.data?.message ||
                "Failed to update product"
            );
        },
    });
};

export default useUpdateProduct;