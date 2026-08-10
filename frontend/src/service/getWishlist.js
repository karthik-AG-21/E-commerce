import axios from "axios";

async function getWishlist(userId) {

    const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
    
    return data.wishlist;
}

export default getWishlist;