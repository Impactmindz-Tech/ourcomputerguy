import { baseApi } from "../../utils/FetchBaseQuery";


const HomeService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: (id) => (`/assigned_product/${id}`),
        }),
    }),
});

export const { useProductsQuery } = HomeService
export default HomeService