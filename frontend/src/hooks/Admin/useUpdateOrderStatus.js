import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateOrderStatus from "../../service/Admin/updateOrderStatus";


function useUpdateOrderStatus(){

    const queryClient  = useQueryClient();

    return useMutation({
        mutationFn:updateOrderStatus,

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["users"]
            })
        },
    })
}

export default useUpdateOrderStatus;