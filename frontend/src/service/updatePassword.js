import api from "../api/api";

async function updatePassword({ currentPassword, newPassword }){
   const response = await api.put("/user/change-password", {currentPassword,newPassword,});

    return response.data;
}

export default updatePassword;