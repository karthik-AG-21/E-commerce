import api from "../../api/api.js";

const getAllProducts = async() => {

    const res = await api.get("/admin/products")
    console.log("all products", res.data)
    return res.data.data
}

export default getAllProducts;