import { useMutation } from "@tanstack/react-query";
import addAddress from "../service/updateAddress";


export default function useAddAddress() {
    return useMutation({
        mutationFn: ({ userId, address }) => addAddress(userId, address),
    });
}