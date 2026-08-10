import { useQuery } from "@tanstack/react-query";
import getProductsById from "../service/getProductsById";



function useProductById(id){
    console.log("called the id ")
    return useQuery({
        queryKey:["product",id],
        queryFn:()=>getProductsById(id),
        enabled: !!id,
    })

}
export default useProductById;