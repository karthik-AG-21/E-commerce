import api from "../../api/api.js";

const updateUserStatus = async ({ userId, status, }) => {

    const response = await api.patch(`/admin/block`,{ userId , status });

    return response.data;
};

export default updateUserStatus;