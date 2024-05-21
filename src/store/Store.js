// Store.js
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slice/CartSlice";

const Store = configureStore({
    reducer: {
        [CartSlice.name]: CartSlice.reducer,
        // [videoSlice.reducerPath]: videoSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(baseApi.middleware)
});

export default Store;