import { useMutation } from "@tanstack/react-query";
import updateCart from "../../service/updateCart";

function useUpdateCart() {
  return useMutation({ 
    mutationFn: updateCart 
  });
}

export default useUpdateCart;