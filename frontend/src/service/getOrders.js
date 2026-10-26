import api from "../api/api.js";

export async function getOrders(userId, page = 1, limit = 5, search = "") {

    const { data } = await api.get("/orders/my-orders", { params: { page, limit, search } });

    console.log(data , "orderApi")

    return data;
}

export default getOrders;