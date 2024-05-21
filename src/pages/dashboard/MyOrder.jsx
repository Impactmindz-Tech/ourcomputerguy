import React from 'react'
import orderList from '../../constant/myorder'
import { Link } from 'react-router-dom'

const MyOrder = () => {
  return (
    <div className="container">
      <h1 className='py-5'>My Order</h1>
      {orderList?.map((item, index) => (
        <div key={index} className='bg-white mt-3 p-6 flex justify-between border-[#e0e0e0] border'>
          <div className='flex gap-5'>
            <img className='w-14 object-cover' src={item.img} alt="product_image" />
            <div>
              <h2>{item.productName}</h2>
              <p className='pt-1'>{item.sku}</p>
              <h2>₹ {item.price}</h2>
            </div>
          </div>
          <div className='text-center'>
            <h2 className='font-semibold'>Products In Orders</h2>
            <h2 className='pt-2'>{item.productsOrder}</h2>
          </div>
          <div>
            <h2 className='font-semibold'>{item.status}</h2>
            <p className='text-xs'>{item.shipmentStatus}</p>
            <div className='text-center'>
              <button type="submit" className="text-center mt-3 bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                Reorder
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrder