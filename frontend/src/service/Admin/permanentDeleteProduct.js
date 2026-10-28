import api from "../../api/api";

export const permanentDeleteProduct = async (id) => {
    const response = await api.delete(`/admin/trash/permanent/${id}`);

    return response.data;
};