// services/orderService.js

import axios from "axios";


export async function getOrders(userId) {

    const { data } = await axios.get(`http://localhost:3000/users/${userId}`);

    return data.orders;
}