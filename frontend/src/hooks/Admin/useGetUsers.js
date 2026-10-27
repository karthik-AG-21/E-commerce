import { useQuery } from "@tanstack/react-query";
import getUsers from "../../service/Admin/getUsers";

function useGetUsers({ page, limit, search, filter, sort } = {}){

    return useQuery({
        queryKey: ["users", page, limit, search, filter, sort],
        queryFn:() => getUsers({ page, limit, search, filter, sort }),
        placeholderData: (previousData) => previousData,
    })
}

export default useGetUsers;