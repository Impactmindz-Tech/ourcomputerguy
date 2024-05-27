import { baseApi } from "../../utils/FetchBaseQuery";


const HomeService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: (id) => (`/assigned_product/${id}`),
        }),
        order: builder.mutation({
            query: (payload) => ({
                url: `order/${payload.id}`,
                method: 'POST',
                body: payload.productsDetails
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const { useProductsQuery, useOrderMutation } = HomeService
export default HomeService