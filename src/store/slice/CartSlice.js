// CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Cart: [],
    products: []
}

const CartSlice = createSlice({
    name: "ecom",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCart: (state, action) => {
            state.Cart = action.payload;
        },
        addToCart: (state, action) => {
            const existingProduct = state.Cart.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.Cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const existingProduct = state.Cart.find(item => item.id === action.payload.id);
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            } else {
                state.Cart = state.Cart.filter(item => item.id !== action.payload.id);
            }
        },
        removeItemFromCart: (state, action) => {
            state.Cart = state.Cart.filter(item => item.id !== action.payload.id);
        }
    }
});

export const { setCart, setProducts, addToCart, removeFromCart, removeItemFromCart } = CartSlice.actions;

export default CartSlice;
