import React, { useState } from 'react'
import ProductCart from '../../components/ProductCart'
import productData from '../../constant/Products'
import Slider from '../../components/Slider';

const Products = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const handleClickProduct = (item) => {
        const isSelected = selectedProducts.some((p) => p.id === item.id);
        if (isSelected) {
            setSelectedProducts(selectedProducts.filter((p) => p.id !== item.id))
        } else {
            setSelectedProducts([...selectedProducts, item])
        }
        console.log(selectedProducts)
    }

    return (
        <div className="container">
            <Slider />
            <div className='bg-white my-8 p-6'>
                <h1>Products</h1>
                <div className='grid grid-cols-5 gap-4 pt-5'>
                    {productData?.products?.map((product, index) => (
                        <ProductCart
                            key={index}
                            item={product}
                            selectedProducts={selectedProducts}
                            handleClickProduct={handleClickProduct}
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

export default Products