import { useQuery } from "@tanstack/react-query";
import getMobiles from "../service/getMobiles";



function useMobiles(){
    return useQuery({
        queryKey: ["mobiles"],
        queryFn:getMobiles,
        
    })
}

export default useMobiles;