import { baseApi } from "../../utils/FetchBaseQuery";


const HomeService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: (id) => (`/assigned_product/${id}`),
        }),
        order: builder.mutation({
            query: (id, orderData) => ({
                url: `order/${id}`,
                method: 'POST',
                body: orderData
            }),
        }),
    }),
});

export const { useProductsQuery, useOrderMutation } = HomeService
export default HomeService