import { createSlice } from "@reduxjs/toolkit";

const initialState = {
items: [],
};

const cartSlice = createSlice({
name: "cart",
initialState,

reducers: {
    // Store cart items returned by the backend.
    setCart: (state, action) => {
        state.items = action.payload ?? [];
    },

    // Add a product or increase its quantity.
    addToCart: (state, action) => {
        const payload = action.payload;
        const product = payload?.product ?? payload;

        if (!product?._id) return;

        const quantity = payload?.quantity ?? 1;

        const existingItem = state.items.find((item) => {
            const currentProduct = item.product ?? item;

            return (
                String(currentProduct._id) === String(product._id)
            );
        });

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.items.push({
                product,
                quantity,
            });
        }
    },

    // Remove a product using its MongoDB product ID.
    removeCart: (state, action) => {
        const productId =
            action.payload?.product?._id ??
            action.payload?._id;

        if (!productId) return;

        state.items = state.items.filter((item) => {
            const product = item.product ?? item;

            return String(product._id) !== String(productId);
        });
    },

    // Increase the quantity of a product.
    addQuantity: (state, action) => {
        const productId =
            action.payload?.product?._id ??
            action.payload?._id;

        const item = state.items.find((cartItem) => {
            const product = cartItem.product ?? cartItem;

            return String(product._id) === String(productId);
        });

        if (item) {
            item.quantity += 1;
        }
    },

    // Decrease the quantity without going below 1.
    removeQuantity: (state, action) => {
        const productId =
            action.payload?.product?._id ??
            action.payload?._id;

        const item = state.items.find((cartItem) => {
            const product = cartItem.product ?? cartItem;

            return String(product._id) === String(productId);
        });

        if (item && item.quantity > 1) {
            item.quantity -= 1;
        }
    },

    // Empty the Redux cart.
    clearCart: (state) => {
        state.items = [];
    },
},


});

export const {
setCart,
addToCart,
removeCart,
addQuantity,
removeQuantity,
clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
