
import api from "../../api/api.js";


async function getUsers(){

    const res =  await api.get("/admin/all")

    return res.data
}

export default getUsers;