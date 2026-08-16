import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserStatus from "../../service/Admin/userService";

const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserStatus,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export default useUpdateUserStatus;