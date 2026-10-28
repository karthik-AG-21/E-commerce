import api from "../../api/api";

export const restoreProduct = async (id) => {

    const response = await api.patch(`/admin/trash/restore/${id}`);

    return response.data;
};
