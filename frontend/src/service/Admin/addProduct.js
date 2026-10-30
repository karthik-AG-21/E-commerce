


import api from "../../api/api.js";

async function addProduct(productData) {
    const res = await api.post("/admin/products/create", productData);
    return res.data;
}

export default addProduct;


export const updateProduct = async ({ id, product }) => {
    const response = await api.put(`/admin/products/${id}`,product);

    return response.data;
};

