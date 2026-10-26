import { useQuery } from "@tanstack/react-query"
import getAllProducts from "../../service/Admin/getAllProducts";



const  useGetAllProducts = ()=>{

    return useQuery({
        queryKey:["products"],
        queryFn:getAllProducts
    })
}

export default useGetAllProducts;