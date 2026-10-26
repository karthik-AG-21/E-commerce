import { useQuery } from "@tanstack/react-query"
import getAllOrders from "../../service/Admin/getAllOrders";



const useGetAllOrders = ()=>{

    return useQuery({
        queryKey:["orders"],
        queryFn:getAllOrders
    })
}

export default useGetAllOrders;