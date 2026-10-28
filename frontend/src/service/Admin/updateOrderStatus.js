
import api from "../../api/api";

async function updateOrderStatus({ userId, orderId, status }) {
    
    const res = await api.patch(`/admin/orders/${userId}/${orderId}`, { status });

    return res.data;
}

export default updateOrderStatus;
