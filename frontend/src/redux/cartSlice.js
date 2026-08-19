import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        setCart(state, action) {
            state.items = action.payload;
        },
        addToCart(state, action) {

            const existingItem = state.items.find((item) => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                const product = {...action.payload,quantity: 1}
                state.items.push(product)
            }
        },
        removeCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
        },
        addQuantity(state, action) {
            state.items.map((item) => {
                if (item.id === action.payload.id) {
                    item.quantity += 1
                }
            })
        },
        removeQuantity(state, action) {
            state.items.map((item) => {
                if (item.id === action.payload.id) {
                    if (item.quantity > 0)
                        item.quantity -= 1
                }
            })
        },

        clearCart(state){
            state.items = []
        }

    }
})
export const { setCart, addToCart, removeCart, addQuantity, removeQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer