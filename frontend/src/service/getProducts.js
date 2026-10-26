import api from "../api/api.js"
async function getProducts(filters = {}) {
    const { category = "all", search = "", brand = "all", sort = "newest", page = 1, limit = 24} = filters;

    const res = await api.get("/products", {
        params: { category, search, brand, sort, page, limit, },
    });

    console.log("all prod", res.data)

    return res.data;
}

export default getProducts;