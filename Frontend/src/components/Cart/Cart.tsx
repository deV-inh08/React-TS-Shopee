import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import path from '../../constants/path';
import { ProductAddToCart } from '../../types/products.type';
import { formatCurrency } from '../../utils/utils';
import QuantityController from '../QuantityController';
import { useCart } from '../../contexts/CartContext';
import Button from '../Button';
import { produce } from "immer"

interface ExtendedPurchase extends ProductAddToCart {
    disable: boolean
    checked: boolean
}

const Cart = () => {
    const { cartItems } = useCart();
    const [cart, setCart] = useState<ExtendedPurchase[]>([]);

    useEffect(() => {
        setCart(cartItems.map((item) => (
            {
                ...item,
                disable: false,
                checked: false
            }
        )) || [cart])
    }, []);

    const handleChecked = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCart(produce((draft) => {
            draft[productIndex].checked = event.target.checked;
        }))
    };

    const isAllChecked = cart.every((item) => item.checked);

    const handleCheckAll = () => {
        setCart(prev => prev.map((item) => (
            {
                ...item,
                checked: !isAllChecked
            }
        )))
    };

    return (
        <div className='bg-neutral-100 py-16'>
            <div className='container'>
                <div className='overflow-auto'>
                    <div className='min-w-[1000px]'>
                        <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                            <div className='col-span-6'>
                                <div className='flex items-center'>
                                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                        <input type="checkbox" className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll}/>
                                    </div>
                                    <div className='flex-grow text-black'>
                                        San pham
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='grid text-center grid-cols-5'>
                                    <p className='col-span-2'>Don gia</p>
                                    <p className='col-span-1'>So luong</p>
                                    <p className='col-span-1'>So tien</p>
                                    <p className='col-span-1'>Thao tac</p>
                                </div>
                            </div>
                        </div>
                        <div className='my-3 rounded-sm bg-white p-5 shadow'>
                            {cart.map((item, index) => {
                                return (
                                    <div key={index} className='grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white px-4 py-5 mt-5 text-sm text-gray-500'>
                                        <div className='col-span-6'>
                                            <div className='flex items-center'>
                                                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                                    <input type="checkbox" className='h-5 w-5 accent-orange' checked={item.checked} onChange={handleChecked(index)}/>
                                                </div>
                                                <div className='flex-grow'>
                                                    <div className='flex items-center'>
                                                        <Link to={`${path.productDetail}${item.id}`} className='h-20 w-20 flex-shrink-0'>
                                                            <img src={item.thumbnail} alt="product" />
                                                        </Link>
                                                        <div className='flex-grow px-2 pt-1 pb-2'>
                                                            <Link 
                                                                to={`${path.productDetail}${item.id}`}
                                                                className='line-clamp-2'    
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-6'>
                                            <div className="grid grid-cols-5 items-center mt-5">
                                                <div className='col-span-2'>
                                                    <div className='flex items-center justify-center'>
                                                        <span className='text-gray-500 line-through'>
                                                            ₫{formatCurrency(item.price * 24 * item.quantity)}
                                                        </span>
                                                        <span className='ml-3 text-orange font-bold text-lg'>
                                                            ₫{formatCurrency((item.price * 24) * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='col-span-1'>
                                                    <QuantityController 
                                                        value={item.quantity} 
                                                        max={100}
                                                        className='flex items-center'
                                                    >    
                                                    </QuantityController>
                                                </div>
                                                <div className='col-span-1'>
                                                    <button className='bg-none text-black transition-colors hover:text-orange'>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                       
                    </div>
                </div>  
            </div>
            <div className='sticky bottom-0 flex flex-grow rounded-sm bg-white p-5 shadow border-gray-200 sm:items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type="checkbox" className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll}/>
                </div>
                <button className='mx-3 border-none bg-none'>Select all</button>
                <button className='mx-3 border-none bg-none'>Delete all</button>
                <div className='ml-auto flex items-center justify-center'>
                    <div>
                        <div className='flex items-center justify-end'>
                            <p>Tong thanh toan (0 san pham)</p>
                            <p className='ml-2 text-2xl text-orange'>₫138000</p>
                        </div>
                        <div className='flex items-center justify-end text-sm'>
                            <p className='text-gray-500'>Tiet Kiem</p>
                            <p className='ml-6 text-orange'>₫138000</p>
                        </div>
                    </div>
                    <Button
                        className='ml-4 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-700 transition-all'
                    >
                        Mua hang
                    </Button>
                </div>
            </div>
        </div>
    )
};
export default Cart
