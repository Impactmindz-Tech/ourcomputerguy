import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import productData from '../../constant/Products';
import ProductCart from '../../components/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../store/slice/CartSlice';

const Home = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector((state => state?.ecom?.products))

  useEffect(() => {
    dispatch(setProducts(productData.products))
  }, [productData])

  return (
    <div className="container">
      <Slider />
      <div className='bg-white my-8 p-6'>
        <h1>Products</h1>
        <div className='grid grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5'>
          {allProducts?.map((product, index) => (
            <ProductCart
              key={index}
              item={product}
            />
          ))}
        </div>
        <div className='text-center mt-10'>
          <button type="submit" className="main_btn mt-3 bg-blue-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;
