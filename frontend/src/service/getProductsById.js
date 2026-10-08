import axios from "axios";
import api from "../api/api.js"

async function getProductsById(id){

    const res = await api.get(`/${id}`);
    
    return res.data.data;

}

export default getProductsById;