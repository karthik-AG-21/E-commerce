import { useMutation } from "@tanstack/react-query"
import updatePassword from "../service/updatePassword";


const useUpdatePassword = ()=>{
    return useMutation({
        mutationFn:updatePassword
    })
}

export default useUpdatePassword;