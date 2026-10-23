
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    productIds: [],
};

const getProductId = (item) => {
    const product =
        item?.product?._id ??
        item?.product ??
        item?._id ??
        item;

    return product == null ? null : String(product);
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,

    reducers: {
        setWishlist: (state, action) => {
            const payload = action.payload;

            if (Array.isArray(payload)) {
                state.items = payload;
                state.productIds = [
                    ...new Set(
                        payload.map(getProductId).filter(Boolean)
                    ),
                ];
            } else if (Array.isArray(payload?.items)) {
                state.items = payload.items;

                state.productIds = [
                    ...new Set(
                        payload.items
                            .map(getProductId)
                            .filter(Boolean)
                    ),
                ];
            } else {
                state.items = [];
                state.productIds = [];
            }
        },

        // Synchronize all IDs returned by the backend.
        setWishlistProductIds: (state, action) => {
            state.productIds = [
                ...new Set(
                    (action.payload ?? [])
                        .map(getProductId)
                        .filter(Boolean)
                ),
            ];
        },

        addToWishlist: (state, action) => {
            const product = action.payload?.product ?? action.payload;
            const productId = getProductId(product);

            if (!productId) return;

            if (!state.productIds.includes(productId)) {
                state.productIds.push(productId);
            }

            const exists = state.items.some(
                (item) => getProductId(item) === productId
            );

            if (!exists) {
                state.items.push({ product });
            }
        },

        removeFromWishlist: (state, action) => {
            const productId = getProductId(action.payload);

            if (!productId) return;

            state.productIds = state.productIds.filter(
                (id) => id !== productId
            );

            state.items = state.items.filter(
                (item) => getProductId(item) !== productId
            );
        },
    },
});

export const {
    setWishlist,
    setWishlistProductIds,
    addToWishlist,
    removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
