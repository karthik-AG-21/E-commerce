import axios from "axios";
import api from "../api/api.js"

async function getProducts(category) {

    console.log(category, )

   const res = await api.get("/?", {params:category && category !== "all" ? {category} : {}})

    return res.data.data;
}

export default getProducts;