import { useMutation } from "@tanstack/react-query";
import { clearCartApi } from "../service/clearCart";


const useClearCart = () => {
    return useMutation({
        mutationFn: (userId) => clearCartApi(userId),
    });
};

export default useClearCart;