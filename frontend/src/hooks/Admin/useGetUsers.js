import { useQuery } from "@tanstack/react-query";
import getUsers from "../../service/Admin/getUsers";

function useGetUsers(){

    return useQuery({
        queryKey:["users"],
        queryFn:getUsers,
    })
}

export default useGetUsers;