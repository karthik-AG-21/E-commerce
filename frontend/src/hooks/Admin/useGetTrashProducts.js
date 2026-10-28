import { useQuery } from "@tanstack/react-query";
import { getTrashProducts } from "../../service/Admin/getTrashProducts";

const useGetTrashProducts = ({ page, limit }) => {
    return useQuery({
        queryKey: ["trash", { page, limit }],
        queryFn: () => getTrashProducts({ page, limit }),
        placeholderData: (previousData) => previousData,
    });
};

export default useGetTrashProducts;