import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../service/authApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
