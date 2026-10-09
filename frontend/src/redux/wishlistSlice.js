import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.items = action.payload ?? [];
        },


        addToWishlist: (state, action) => {
            const product = action.payload?.product ?? action.payload;

            if (!product?._id) return;

            const exists = state.items.some((item) => {
                const currentProduct = item.product ?? item;
                return String(currentProduct._id) === String(product._id);
            });

            if (!exists) {
                // Keep the same structure as the backend wishlist response.
                state.items.push({ product });
            }
        },

        removeFromWishlist: (state, action) => {
            const productId =
                action.payload?.product?._id ?? action.payload?._id;

            if (!productId) return;

            state.items = state.items.filter((item) => {
                const currentProduct = item.product ?? item;

                return String(currentProduct._id) !== String(productId);
            });
        },
    },


});

export const {setWishlist,addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
