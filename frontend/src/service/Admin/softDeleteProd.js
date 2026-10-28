import api from "../../api/api";


export const deleteProduct = async (id) => {

    const response = await api.patch(`/admin/products/${id}/softDelete`);

    return response.data;
};