
import api from "../../api/api.js";


async function getUsers(){

    const res =  await api.get("/admin/users")
    console.log("all users", res.data)
    return res.data.data
}

export default getUsers;