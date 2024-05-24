import React, { useEffect, useState } from 'react'
import { useViewOrdersQuery } from '../../store/service/MyOrdersService'
import { useParams } from 'react-router-dom'

const ViewOrders = () => {
  const params = useParams()
  const { data: viewOrder } = useViewOrdersQuery(params)
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (viewOrder?.status && viewOrder?.data) {
      const total = viewOrder.data.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.total_amount);
      }, 0);
      setGrandTotal(total);
    }
  }, [viewOrder]);

  return (
    <div className="container">
      <h1 className='py-5'>My Order</h1>
      <div className='bg-white'>
        <div className='pt-5'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='text-left border-b border-[#ccc] pb-4 px-6'>Sr No.</th>
                <th className='text-left border-b border-[#ccc] pb-4 px-6'>SKU No.</th>
                <th className='text-left border-b border-[#ccc] pb-4 px-6'>Product Name</th>
                <th className='text-left border-b border-[#ccc] pb-4 px-6'>Quantity</th>
                <th className='text-left border-b border-[#ccc] pb-4 px-6'>Uniq Cost</th>
                <th className='text-left border-b border-[#ccc] pb-4 px-6'>Total</th>
              </tr>
            </thead>
            <tbody>
              {viewOrder?.status && viewOrder?.data?.map((item, index) => (
                <tr key={index}>
                  <td className='border-b border-[#ccc] py-4 px-6'>{index + 1}</td>
                  <td className='border-b border-[#ccc] py-4 px-6'>{item.sku}</td>
                  <td className='border-b border-[#ccc] py-4 px-6'>{item.product_name}</td>
                  <td className='border-b border-[#ccc] py-4 px-6'>{item.orderedQty}</td>
                  <td className='border-b border-[#ccc] py-4 px-6'>{item.currency} {item.product_price}</td>
                  <td className='border-b border-[#ccc] py-4 px-6'>{item.currency} {item.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='bg-black-200 text-white py-10 pe-20'>
        <div className='max-w-sm ml-auto flex justify-between items-center'>
          <h1>Grand Total Price:-</h1>
          <p className='text-4xl'>{viewOrder?.data[0].currency}{grandTotal}</p>
        </div>
      </div>
    </div>
  )
}

export default ViewOrders