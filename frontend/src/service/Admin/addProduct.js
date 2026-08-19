import axios from "axios";


export async function addProduct(product) {
    const response = await axios.post("http://localhost:3000/products", product);

    return response.data;
}


export async function updateProduct({ id, product }) {
    const response = await axios.patch(`http://localhost:3000/products/${id}`, product);

    return response.data;
}

export async function deleteProduct(id) {
    const response = await axios.delete(`http://localhost:3000/products/${id}`);

    return response.data;
}