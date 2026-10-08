import axios from "axios";
import api from "../api/api";

async function getCart() {

  const response = await api.get("/cart/get")

  console.log("h1",response.data.data);
  return response.data.data.items;
  
}

export default getCart;