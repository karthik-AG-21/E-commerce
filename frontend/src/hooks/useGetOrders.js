import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../service/getOrders";

export default function useGetOrders(userId, page = 1,  limit = 5, search = "") {
    
    return useQuery({
        queryKey: ["orders", userId, page, limit, search],

        queryFn: () => getOrders(userId, page, limit, search),

        enabled: Boolean(userId),

        placeholderData: (previousData) => previousData,
    });
}