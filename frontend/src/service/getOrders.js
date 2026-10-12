import api from "../api/api.js";

export async function getOrders() {
    const { data } = await api.get("/orders/my-orders");
    return data.data;
}

export default getOrders;
