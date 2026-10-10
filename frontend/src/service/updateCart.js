import api from "../api/api.js";

async function updateCart({ type, productId, quantity = 1 }) {
if (type !== "clear" && !productId) {
throw new Error("Product ID is required");
}

 

if (type === "add") {
    const response = await api.post("/cart/post", {productId,quantity});

    return response.data;
}

// Remove a product from the cart

if (type === "remove") {
    const response = await api.delete(
        `/cart/delete/${productId}`
    );

    return response.data;
}

// Update the quantity of a cart item

if (type === "update") {
    const response = await api.patch(`/cart/quantity/${productId}`,{ quantity });

    return response.data;
}

throw new Error("Invalid cart operation");


}

export default updateCart;
