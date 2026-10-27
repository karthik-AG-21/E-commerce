import axios from "axios";


import api from "../../api/api.js";

async function addProduct(productData) {
    const res = await api.post("/admin/products/create", productData);
    return res.data;
}

export default addProduct;


export async function updateProduct({ id, product }) {
    const response = await axios.patch(`http://localhost:3000/products/${id}`, product);

    return response.data;
}

export async function deleteProduct(id) {
    const response = await axios.delete(`http://localhost:3000/products/${id}`);

    return response.data;
}