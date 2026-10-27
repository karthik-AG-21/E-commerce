
import api from "../../api/api.js";


async function getUsers({ page = 1, limit = 8, search = "", filter = "", sort = "newest-users", }) {

    const res = await api.get("/admin/users", { params: { page, limit, search, filter, sort }, })

    console.log("all users", res.data.data)

    return res.data
}

export default getUsers;

