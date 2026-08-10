import { useMutation } from "@tanstack/react-query";
import placeOrder from "../service/orderService";


export default function usePlaceOrder() {
    return useMutation({
        mutationFn: placeOrder,
    });
}