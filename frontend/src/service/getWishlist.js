import api from "../api/api.js";

async function getWishlist(page = 1, limit = 5) {

    console.log("Fetching wishlist:", { page, limit });

    const response = await api.get("/wishlist/get", {params: { page, limit }});
    
    console.log("Wishlist API response:", response.data);

    return {
        items: response.data.data,
        pagination: response.data.pagination,
        wishlistProductIds: response.data.wishlistProductIds ?? [],
    };
}

export default getWishlist;