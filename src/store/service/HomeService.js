import { baseApi } from "../../utils/FetchBaseQuery";


const HomeService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: () => ('/assigned_product'),
        }),
    }),
});

export const { useProductsQuery } = HomeService
export default HomeService