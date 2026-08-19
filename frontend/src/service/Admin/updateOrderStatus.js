import axios from "axios"


async function updateOrderStatus({userId, orderId ,status}){

    const  response = await axios.get(`http://localhost:3000/users/${userId}`);

    const user = response.data;

    const order = user?.orders?.find((order) => order.id === orderId);

    order.status = status;

    const res = await axios.patch( `http://localhost:3000/users/${userId}`,{ orders: user.orders });

    return res.data;
}

export default updateOrderStatus