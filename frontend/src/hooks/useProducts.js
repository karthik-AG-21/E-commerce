import { useQuery } from "@tanstack/react-query";
import getProducts from "../service/getProducts";




function useProducts(category){
    console.log("called the category")
    return useQuery({
        queryKey:["products",category],
        queryFn:()=>getProducts(category),
    })

}
export default useProducts;