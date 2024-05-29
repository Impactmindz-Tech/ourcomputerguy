import React, { useEffect, useState } from 'react'
import { useViewOrdersQuery } from '../../store/service/MyOrdersService'
import { useNavigate, useParams } from 'react-router-dom'
import { useOrderMutation } from '../../store/service/HomeService'
import { getLocalStorage } from '../../utils/LocalStorageUtills'
import { Skeleton } from '@mui/material'

const ViewOrders = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { data: viewOrder, isLoading } = useViewOrdersQuery(params.id)
  const [productsDetails, setProductsDetails] = useState([])
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const [repeatOrder] = useOrderMutation()

  useEffect(() => {
    if (viewOrder && viewOrder.data) {
      const userIds = viewOrder.data.map((item) => item.user_unique_id);
      setId(userIds);
    }
  }, [viewOrder, setId]);
  

  useEffect(() => {
    if (viewOrder?.status && viewOrder?.data) {
      const total = viewOrder.data.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.total_amount);
      }, 0);
      setGrandTotal(total);
    }
    if (viewOrder) {
      const details = viewOrder?.data.map((item) => {
        return {
          productId: item.product_id,
          quantity: item.orderedQty,
          totalPrice: item.total_amount,
        }
      });
      setProductsDetails(details)
    }
  }, [viewOrder]);

  const orderNow = async () => {
    if (!window.confirm('Confirm this order?')) return;
    setLoading(true);
    try {
      const userId = getLocalStorage('user').unique_id;
      const response = await repeatOrder({ id: userId, productsDetails });
      if (response?.data.status) {
        navigate('/user/thankupage');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h1 className="py-5">My Order</h1>
        <button
          onClick={orderNow}
          type="button"
          className="text-center bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Reorder'}
        </button>
      </div>
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
            {isLoading ?
              <tbody>
                {[...Array(4)].map((_, index) => (
                  <tr key={index}>
                    <td><Skeleton width='90%' sx={{ padding: '16px 16px' }} /></td>
                    <td><Skeleton width='90%' sx={{ padding: '16px 16px' }} /></td>
                    <td><Skeleton width='90%' sx={{ padding: '16px 16px' }} /></td>
                    <td><Skeleton width='90%' sx={{ padding: '16px 16px' }} /></td>
                    <td><Skeleton width='90%' sx={{ padding: '16px 16px' }} /></td>
                    <td><Skeleton width='90%' sx={{ padding: '16px 16px' }} /></td>
                  </tr>
                ))}
              </tbody>
              :
              <tbody>
                {viewOrder?.status && id == getLocalStorage('user').unique_id && viewOrder?.data?.map((item, index) => (
                  <tr key={index}>
                    <td className='border-b border-[#ccc] py-4 px-6'>{index + 1}</td>
                    <td className='border-b border-[#ccc] py-4 px-6'>{item.sku}</td>
                    <td className='border-b border-[#ccc] py-4 px-6'>{item.product_name}</td>
                    <td className='border-b border-[#ccc] py-4 px-6'>{item.orderedQty}</td>
                    <td className='border-b border-[#ccc] py-4 px-6'>{item.currency} {item.product_price}</td>
                    <td className='border-b border-[#ccc] py-4 px-6'>{item.currency} {item.total_amount}</td>
                  </tr>
                ))}
              </tbody>}
          </table>
        </div>
      </div>
      {id == getLocalStorage('user').unique_id &&<div className='bg-black-200 text-white py-10 pe-20'>
        <div className='max-w-sm ml-auto flex justify-between items-center'>
          <h1>Grand Total Price:-</h1>
          <p className='text-4xl'>{viewOrder?.data[0].currency}{grandTotal}</p>
        </div>
      </div>}
    </div>
  )
}

export default ViewOrders