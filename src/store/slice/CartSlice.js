import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Cart: [],
    products: []
};

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
            const existingProduct = state.Cart.find(item => item.product_id === action.payload.product_id);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = existingProduct.product_price * existingProduct.quantity;
            } else {
                state.Cart.push({ ...action.payload, quantity: 1, totalPrice: action.payload.product_price });
            }
        },
        removeFromCart: (state, action) => {
            const existingProduct = state.Cart.find(item => item.product_id === action.payload.product_id);
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
                existingProduct.totalPrice = existingProduct.product_price * existingProduct.quantity;
            } else {
                state.Cart = state.Cart.filter(item => item.product_id !== action.payload.product_id);
            }
        },
        removeItemFromCart: (state, action) => {
            state.Cart = state.Cart.filter(item => item.product_id !== action.payload.product_id);
        }
    }
});

export const { setCart, setProducts, addToCart, removeFromCart, removeItemFromCart } = CartSlice.actions;

export default CartSlice;
