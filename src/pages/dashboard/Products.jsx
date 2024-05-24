import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import productData from '../../constant/Products';
import ProductCart from '../../components/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, setProducts } from '../../store/slice/CartSlice';
import { useOrderMutation, useProductsQuery } from '../../store/service/HomeService';
import { getLocalStorage } from '../../utils/LocalStorageUtills';
import { Toaster } from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch()
  const { data: Products, isError } = useProductsQuery(getLocalStorage('user').unique_id)
  const allProducts = useSelector((state => state?.ecom?.products))
  const cart = useSelector((state => state?.ecom?.Cart))
  const [productsDetails, setProductsDetails] = useState([])
  const [orderData] = useOrderMutation()
  const [loading, setLoading] = useState(false); // Add loading state
  const [confirmation, setConfirmation] = React.useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    try {
      if (Products?.status) {
        dispatch(setProducts(Products))
      }
    } catch (error) {
      console.log(error)
    }
  }, [Products])

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.totalPrice * item.quantity)
    }, 0)
  };

  useEffect(() => {
    if (cart) {
      const details = cart.map((item) => {
        return {
          productId: item.product_id,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }
      });
      setProductsDetails(details)
    }
  }, [cart]);

  const orderNow = async () => {
    setLoading(true);
    const payload = JSON.stringify(productsDetails);
    const id = getLocalStorage('user').unique_id
    try {
      const response = await fetch(`https://impactmindz.in/client/artie/back_end/api/order/${id}`, {
        method: 'POST',
        body: payload,
      });
      const responseData = await response.json();
      if (responseData?.status) {
        console.log(responseData, 'tt')
        navigate('/user/thankupage')
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false); // Set loading to false on error
    }
    dispatch(setCart([]));
    // const id = getLocalStorage('user').unique_id
    // let details
    // if (cart) {
    //   details = cart.map((item) => {
    //     return {
    //       productId: item.product_id,
    //       quantity: item.quantity,
    //       totalPrice: item.totalPrice,
    //     }
    //   });
    //   setProductsDetails(details)
    // }
    // try {
    //   const responce = await orderData(id, details)
    //   console.log(responce)
    // } catch (error) {
    //   console.log(error)
    // }
  }


  return (
    <div className="container">
      <Slider />
      <div className='bg-white my-8 p-6'>
        <h1>Products</h1>
        <div className='grid grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5'>
          {allProducts?.data?.map((product, index) => (
            <ProductCart
              key={index}
              item={product}
            />
          ))}
        </div>
        <hr className='my-14 border-[#ccc]' />
        {cart?.length > 0 ?
          <table className='w-full'>
            <tbody>
              <tr>
                <th className='text-right w-[85%]'>Total Price:</th>
                <td className='text-right w-[15%]'>{cart[0]?.currency} {getTotalCartPrice()}</td>
              </tr>
              <tr>
                <th className='w-1/2'></th>
                <td className='w-1/2 text-right'>
                  <button onClick={orderNow} type="submit" className="main_btn mt-14 bg-blue-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                    <div className='flex items-center justify-center'>
                      <span className=''>Order Now</span>
                      <ClipLoader size={15} className='ml-2' color='#000' loading={loading} />
                    </div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table> : null}
      </div>
      <Toaster />
    </div>
  )
}

export default Products;
