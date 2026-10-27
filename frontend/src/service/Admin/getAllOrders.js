import api from "../../api/api";


async function getAllOrders(){

    const res =  await api.get("/admin/orders")

    console.log("allOrders", res.data);

    return res.data.data
}

export default getAllOrders;