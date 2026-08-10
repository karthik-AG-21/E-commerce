import axios from "axios";

export async function placeOrder({userId, cartItems, totalPrice, paymentMethod,address }) {

    const { data: user } = await axios.get(`http://localhost:3000/users/${userId}`);

    const order = {
        id: crypto.randomUUID(),
        items: cartItems,
        totalPrice,
        paymentMethod,
        address,
        status: "Pending",
        orderedAt: new Date().toISOString(),
    };

    const updatedUser = {
        ...user,
        orders: [...user.orders, order],
    };

    const { data } = await axios.put(`http://localhost:3000/users/${userId}`,updatedUser);

    return data;
}

export default placeOrder;