import api from "../api/api";

async function getCart(page = 1, limit = 5) {
  
    const response = await api.get("/cart/get", {params: { page, limit }});

    console.log("Cart API response:", response.data);

    return {
        items: response.data.data,
        pagination: response.data.pagination,
    };
}

export default getCart;