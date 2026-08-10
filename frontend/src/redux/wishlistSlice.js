
import { createSlice } from "@reduxjs/toolkit";
import Wishlist from "../Pages/Wishlist";


const initialState = {
    items: [],
}


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {

        setWishlist(state, action) {
            state.items = action.payload;
        },
        addToWishlist(state, action) {

            const existingItem = state.items.find((item) => item.id === action.payload.id)

            if (!existingItem) {
                state.items.push(action.payload)
            }


        },
        removeFromWishlist(state, action) {
            state.items = state.items.filter( (item) => item.id !== action.payload.id );
        },
    },


})
export const { setWishlist , addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer