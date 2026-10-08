import axios from "axios";

async function getCart(userId) {
  const { data } = await axios.get(`http://localhost:3000/users/${userId}`);

  return data.cart;
}

export default getCart;