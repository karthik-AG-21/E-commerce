import axios from "axios";

async function updateWishlist({ userId, wishlist }) {

    const { data } = await axios.patch(`http://localhost:3000/users/${userId}`,{wishlist});

    return data;
}

export default updateWishlist;