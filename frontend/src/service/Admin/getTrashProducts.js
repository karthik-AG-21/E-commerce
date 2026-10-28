import api from "../../api/api";

export const getTrashProducts = async ({ page = 1, limit = 8 }) => {
    const response = await api.get("/admin/products/trash", {
        params: { page, limit },
    });

    return response.data;
};