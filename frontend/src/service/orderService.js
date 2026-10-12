import api from "../api/api.js";

async function placeOrder({ address, paymentMethod }) {
    const { data } = await api.post("/orders/create", {address , paymentMethod });

    return data;

}

export default placeOrder;
