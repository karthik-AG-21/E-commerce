
import api from "../../api/api";

async function getAllOrders({ page, limit, search, filter }) {

    const res = await api.get("/admin/orders", {params: { page, limit, search, filter },});

    console.log("all order", res.data)

    return res.data;
}

export default getAllOrders;
