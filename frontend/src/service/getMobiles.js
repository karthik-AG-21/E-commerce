import axios from "axios";
import api from "../api/api.js"




async function getMobiles(){
    

    const res = await api.get("/")

    return res.data.data
}

export default getMobiles;