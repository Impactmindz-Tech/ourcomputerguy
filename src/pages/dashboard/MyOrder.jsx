import React from 'react'
import orderList from '../../constant/myorder'
import { Link } from 'react-router-dom'

const MyOrder = () => {
  return (
    <div className="container">
      {orderList?.map((item, index) => (
        <Link to={item.id}><div key={index} className='bg-white mt-8 p-6 flex justify-between border-[#e0e0e0] border'>
          <div className='flex gap-5'>
            <img className='w-14 object-cover' src={item.img} alt="product_image" />
            <h2>{item.productName}</h2>
          </div>
          <div>
            <h2>₹ {item.price}</h2>
          </div>
          <div>
            <h2 className='font-semibold'>{item.status}</h2>
            <p>{item.shipmentStatus}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default MyOrder