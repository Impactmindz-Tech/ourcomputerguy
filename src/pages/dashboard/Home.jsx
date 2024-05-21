import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import productData from '../../constant/Products';
import ProductCart from '../../components/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../store/slice/CartSlice';

const Home = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state => state?.ecom?.products))

  useEffect(() => {
    dispatch(setProducts(productData.products))
  }, [productData])

  return (
    <div className="container">
      <Slider />
      <div className='bg-white my-8 p-6'>
        <h1>Products</h1>
        <div className='grid grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5'>
          {cart?.map((product, index) => (
            <ProductCart
              key={index}
              item={product}
            />
          ))}
        </div>
        <hr className='my-14 border-[#ccc]'/>
        <table className='w-full'>
          <tr>
            <th className='text-right w-[85%]'>Total Price</th>
            <td className='text-right w-[15%]'>00</td>
          </tr>
          <tr>
            <th className='w-1/2'></th>
            <td className='w-1/2 text-right'>
                <button type="submit" className="main_btn mt-14 bg-blue-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                  Order Now
                </button>
            </td>
          </tr>
        </table>

      </div>
    </div>
  )
}

export default Home;
