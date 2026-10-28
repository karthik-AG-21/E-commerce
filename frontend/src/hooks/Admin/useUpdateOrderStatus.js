
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateOrderStatus from "../../service/Admin/updateOrderStatus";

const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatus,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
    });
};

export default useUpdateOrderStatus;
