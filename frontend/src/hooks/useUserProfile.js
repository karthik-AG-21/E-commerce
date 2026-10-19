import { useQuery } from "@tanstack/react-query";
import getUserProfile from "../service/getUserProfile.js";


const useUserProfile= () => {
    return useQuery({
        queryKey:["userProfile"],
        queryFn:getUserProfile,
    });

};

export default useUserProfile;