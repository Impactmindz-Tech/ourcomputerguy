import React from 'react'
import orderList from '../../constant/myorder'
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useMyOrderQuery } from '../../store/service/MyOrdersService';
import { getLocalStorage } from '../../utils/LocalStorageUtills';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MyOrder = () => {
  const UserUniqId = getLocalStorage('user').unique_id
  const { data: myOrder } = useMyOrderQuery(UserUniqId)

  return (
    <div className="container">
      <h1 className='py-5'>My Order</h1>
      {myOrder?.status && myOrder?.data?.map((item, index) => (
        <div key={index} className='bg-white mb-3 p-6 flex items-center justify-between border-[#e0e0e0] border'>
          <div className='flex gap-5'>
            <ShoppingCartIcon sx={{ fontSize: '40px' }} />
            <div>
              <h2>Order Id : {item.order_id}</h2>
              <p className='pt-1'>{item.sku}</p>
              <h2>{item.currency} {item.totalAmount}</h2>
            </div>
          </div>
          <div className='text-center'>
            <h2 className='font-semibold'>Products This Order</h2>
            <h2 className='pt-2'>{item.totalProducts}</h2>
          </div>
          <div className='text-center'>
            <h2 className='font-semibold'>Status</h2>
            <h2 className='font-semibold'>{item.status}</h2>
            <div className='text-center mt-3 gap-6 flex items-center justify-center'>
              {/* <button type="submit" className="text-center bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                Reorder
              </button> */}
              <Link to={`${item.order_id}`}><RemoveRedEyeIcon sx={{ color: "#646ea6" }} /></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrder