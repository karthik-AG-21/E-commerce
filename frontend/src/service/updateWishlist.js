import api from "../api/api.js";

async function updateWishlist({ type, productId }) {
    if (!productId) {
        throw new Error("Product ID is required");
    }

    if (type === "add") {
        const response = await api.post("/wishlist/add", {
            productId,
        });

        return response.data;
    }

    if (type === "remove") {
        const response = await api.delete(
            `/wishlist/delete/${productId}`
        );

        return response.data;
    }

    throw new Error("Invalid wishlist operation");
}

export default updateWishlist;