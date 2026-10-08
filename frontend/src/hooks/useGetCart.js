import { useQuery } from "@tanstack/react-query";
import getCart from "../service/getCart";

function useGetCart(userId) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart()
  });
}

export default useGetCart;