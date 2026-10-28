
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../service/Admin/softDeleteProd";
import { toast } from "react-toastify";

const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            queryClient.invalidateQueries({
                queryKey: ["trash"],
            });

            toast.success("Product moved to trash successfully");
        },

        onError: (error) => {
            console.log("Soft delete error:", error);
            console.log("Response:", error.response?.data);
            console.log("Status:", error.response?.status);
            toast.error(
                error.response?.data?.message ||
                "Failed to move product to trash"
            );
        },
    });
};

export default useDeleteProduct;
