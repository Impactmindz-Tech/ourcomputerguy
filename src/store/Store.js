import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../utils/FetchBaseQuery';

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        // Add other reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
