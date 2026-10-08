import axios from "axios";

async function updateCart({ userId, cart }) {
  console.log("cart", userId, cart)
  const res = await axios.patch(
    `http://localhost:3000/users/${userId}`, { cart });

  return res.data;
}

export default updateCart;