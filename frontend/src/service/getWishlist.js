import axios from "axios";
import api from "../api/api.js";

async function getWishlist() {

    const  response = await api.get("/wishlist/get");
    
    return response.data.data.items;
}

export default getWishlist;