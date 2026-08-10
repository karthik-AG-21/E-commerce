
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../service/getOrders";



export default function useGetOrders(userId) {

    return useQuery({
        queryKey: ["orders", userId],
        queryFn: () => getOrders(userId),
        enabled: !!userId,
    });

}