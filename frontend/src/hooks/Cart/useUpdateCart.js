import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import updateCart from "../../service/updateCart";

function useUpdateCart() {
const queryClient = useQueryClient()

  return useMutation({ 
    mutationFn: updateCart,

     onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
  });
}

export default useUpdateCart;