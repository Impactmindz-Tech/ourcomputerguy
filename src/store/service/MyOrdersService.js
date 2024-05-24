import { baseApi } from "../../utils/FetchBaseQuery";


const MyOrdersService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        viewOrders: builder.query({
            query: () => (`/Order_details/21`),
        }),
        myOrder: builder.query({
            query: (id) => (`/my_orders/${id}`),
        }),
    }),
});

export const { useViewOrdersQuery , useMyOrderQuery } = MyOrdersService
export default MyOrdersService