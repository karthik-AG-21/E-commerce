import api from "../../api/api.js";

const getAllProducts = async({ page = 1, limit = 8, search = "", filter = "" } = {}) => {

    const res = await api.get("/admin/products",{params: { page, limit, search, filter },});
    
    return res.data
}

export default getAllProducts;