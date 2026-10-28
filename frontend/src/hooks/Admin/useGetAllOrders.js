import { useQuery } from "@tanstack/react-query";
import getAllOrders from "../../service/Admin/getAllOrders";

const useGetAllOrders = ({
    page = 1,
    limit = 8,
    search = "",
    filter = "",
}) => {
    return useQuery({
        queryKey: ["orders", page, limit, search, filter],
        queryFn: () => getAllOrders({ page, limit, search, filter }),
        placeholderData: (previousData) => previousData,
    });
};

export default useGetAllOrders;