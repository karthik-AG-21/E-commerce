import api from "../../api/api.js";

async function getDashboardUsers() {
    const res = await api.get("/admin/dashboard/users");

    console.log(res.data , "hel")
    return res.data.data;
}

export default getDashboardUsers;