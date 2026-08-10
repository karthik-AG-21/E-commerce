import { useQuery } from "@tanstack/react-query";
import getCart from "../service/getCart";

function useGetCart(userId) {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCart(userId),
    enabled: !!userId,
  });
}

export default useGetCart;