import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, removeItemFromCart } from '../store/slice/CartSlice';

const ProductCart = ({ item }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.ecom.Cart);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const isItemInCart = cart.some(cartItem => cartItem.id === item.id);
        setIsSelected(isItemInCart);
    }, [cart, item.id]);

    const handleAddProduct = (item) => {
        dispatch(addToCart(item));
    };

    const handleRemoveProduct = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleRemoveCart = (item) => {
        dispatch(removeItemFromCart(item));
    };

    const getItemQuantity = (item) => {
        const cartItem = cart.find(cartItem => cartItem.id === item.id);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className='border p-4 rounded-md border-[#e0e0e0] relative'>
            {isSelected && (
                <div className='absolute bg-[#646ea6] top-3 right-3 p-1 rounded-full'>
                    <CheckIcon sx={{ color: '#fff' }} />
                </div>
            )}
            <img className='w-full h-[100px] object-contain' src={item.thumbnail} alt={item.caption} />
            <div className='pt-8'>
                <h2 className='text-center'>{item.caption}</h2>
                <p className='font-semibold text-center'>₹ {item.discount}</p>
                <div className='flex justify-center gap-10 mt-3' onClick={(e) => e.stopPropagation()}>
                    <AddCircleIcon onClick={() => handleAddProduct(item)} />
                    <div>{getItemQuantity(item)}</div>
                    <RemoveCircleIcon onClick={() => handleRemoveProduct(item)} />
                </div>
                {isSelected ? (
                    <div className='flex justify-center mt-3'>
                        <button
                            type="button"
                            className="sign-in text-center mt-3 bg-blue-900 text-[red] text-xs font-semibold px-12 py-3 rounded-lg flex items-center gap-x-2"
                            onClick={() => handleRemoveCart(item)}
                        >
                            Remove From Cart
                        </button>
                    </div>
                ) : (
                    <div className='flex justify-center mt-3'>
                        <button
                            type="button"
                            className="sign-in text-center mt-3 bg-blue-900 text-white text-xs font-semibold px-12 py-3 rounded-lg flex items-center gap-x-2"
                            onClick={() => handleAddProduct(item)}
                        >
                            Add To Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCart;
