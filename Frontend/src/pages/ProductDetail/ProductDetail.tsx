import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import productsAPI from '../../apis/product.api';
import ProductRating from '../../components/ProductRating';
import { formatCurrency, formatNumberToSocialStyle } from '../../utils/utils';
import { HashLoader } from "react-spinners"
import { ProductList } from '../../types/products.type';
import Product from '../../components/Product';
import QuantityController from '../../components/QuantityController';
import purchaseAPI from '../../apis/purchase.api';
import USERID from '../../constants/user';
import { CartItem } from '../../types/cartItem.type';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const syncReactToLocal = (cartItems: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
};

const ProductDetail = () => {
    const [ buyCount, setBuyCount ] = useState<number>(1);
    const { id } = useParams();
    const imgRef = useRef<HTMLImageElement>(null);
    const { setCartItems } = useCart()

    useEffect(() => {
        const getCartItems = localStorage.getItem("cartItems");
        if(getCartItems) {
            const parseGetCartItem = JSON.parse(getCartItems || "[]");
            setCartItems(parseGetCartItem)
        }
       
    }, []);

    const addToCartMutation = useMutation({
        mutationFn: purchaseAPI.addToCart,
        onSuccess: async (data) => {
            updatedCartItem(data.data.products[0]);
        },
        onError: (error) => { 
            console.log("Error adding product to cart", error);
            alert("Failed to add product to cart. Please try again");
        }
    });

    const updatedCartItem = (newItem: CartItem) => {
        setCartItems((currentCart) => {
            const existingItem = currentCart.find((item) => item.id === newItem.id);
            let updatedCart;
            if (existingItem) {
                // Update quantity and total for existing item
                updatedCart = currentCart.map((item) =>
                    item.id === newItem.id
                        ? {
                            ...item,
                            quantity: item.quantity + buyCount,
                            total: item.price * (item.quantity + buyCount),
                          }
                        : item
                );
            } else {
                updatedCart = [
                    ...currentCart,
                    { ...newItem, quantity: buyCount, total: newItem.price * buyCount },
                ];
            }
            syncReactToLocal(updatedCart);
            return updatedCart;
        });
    };

    const { data: productDetailData } = useQuery({
        queryKey: ['products', id],
        queryFn: () => productsAPI.getProductDetail(id as string),
        staleTime: 3 * 60 * 1000
    });

    const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const react = e.currentTarget.getBoundingClientRect();
        const image = imgRef.current as HTMLImageElement;

        let { naturalHeight, naturalWidth } = image;
        naturalWidth = naturalWidth + 400;
        naturalHeight = naturalHeight + 400;

        const {offsetX, offsetY} = e.nativeEvent;
        const top = offsetY * (1 - naturalHeight / react.height);
        const left = offsetX * (1 - naturalWidth / react.width);

        image.style.width = naturalWidth + "px";
        image.style.height = naturalHeight + "px";
        image.style.maxWidth = "unset";
        
        image.style.top = top + "px";
        image.style.left = left + "px";
    };

    const handleRemoveZoom = () => {
        imgRef.current?.removeAttribute("style")
    };

    const queryConfig = {category: productDetailData?.data.category as string};
    const { data: productsData } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return productsAPI.getProductsByCategory(queryConfig.category as ProductList)
        }
    });

    const handleBuyCount = (value: number) => {
        setBuyCount(value)
    };

    const handleAddToCart = (userId: number) => {
            addToCartMutation.mutate({
                userId: userId,
                products: [{ id: productDetailData?.data.id, quantity: buyCount}]
            },
            {
                onSuccess: () => {
                    toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000 })
                }
            }
        )
    };

    return (
        <div className='bg-gray-200 py-6'>
            {productDetailData?.data ? (
                <>
                    <div className='bg-white p-4 shadow'>
                        <div className='container'>
                            <div className='grid grid-cols-12 gap-9'>
                                <div className='col-span-5'>
                                    <div className='relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in' onMouseMove={handleZoom} onMouseLeave={handleRemoveZoom}>
                                        <img 
                                            src={productDetailData?.data.thumbnail} 
                                            alt={productDetailData?.data.title} 
                                            className='absolute pointer-events-none top-0 left-0 h-full w-full bg-white object-cover'
                                            ref={imgRef}
                                        />
                                    </div>
                                    <div className='relative mt-4 grid grid-cols-4 gap-1'>
                                        <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                        {productDetailData.data.images.map((item: string, index: number) => {
                                            let isActive = index === 0;
                                            return (
                                                <div className='relative w-full pt-[100%]' key={index}>
                                                    <img 
                                                        src={item} 
                                                        alt="productDetail" 
                                                        className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                                                    />
                                                    {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                                                </div>
                                            )
                                        })}
                                        <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className='col-span-7'>
                                    <h1 className='text-xl font-medium uppercase'>
                                        {productDetailData?.data.description}
                                    </h1>
                                    <div className='mt-8 flex items-center'>
                                        <div className='flex items-center'>
                                            <span className='mt-1 border-b border-b-orange text-orange mr-3'>
                                                {productDetailData?.data.rating}
                                            </span>
                                            <ProductRating></ProductRating>
                                            <ProductRating></ProductRating>
                                            <ProductRating></ProductRating>
                                            <ProductRating></ProductRating>
                                            <ProductRating></ProductRating>
                                        </div>
                                        <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                                        <div>
                                            <span>{formatNumberToSocialStyle(productDetailData?.data.stock * 100)}</span>
                                            <span className='ml-1 text-gray-500'>Đã bán</span>
                                        </div>
                                    </div>
                                    <div className='mt-8 flex items-center bg-gray-300 px-5 py-4'>
                                        <span className='text-gray-500 line-through'> ₫{formatCurrency(productDetailData.data.price * 24)}</span>
                                        <span className='ml-3 text-3xl font-medium text-orange'>
                                            ₫{formatCurrency((productDetailData.data.price * 24) - (productDetailData.data.discountPercentage * 24)) > 0 
                                                ? formatCurrency((productDetailData.data.price * 24) - (productDetailData.data.discountPercentage * 24))
                                                : formatCurrency((productDetailData.data.price * 24)) 
                                            }
                                        </span>
                                        <div className='ml-9 rounded-sm bg-orange py-[5px] px-3 text-xs font-semibold text-white uppercase'>
                                            {productDetailData.data.discountPercentage.toFixed(1)}% Giảm
                                        </div>
                                    </div>
                                    <div className='mt-8 flex items-center'>
                                        <p className='capitalize text-gray-500 mr-4'>
                                            Số lượng:
                                        </p>
                                        <QuantityController onDecrease={handleBuyCount} onIncrease={handleBuyCount} onType={handleBuyCount} value={buyCount} max={productDetailData.stock}></QuantityController>
                                        <div className='ml-6 text-sm text-gray-500'>{productDetailData.data.stock} Sản phẩm có sẵn</div>
                                    </div>
                                    <div className='mt-8 flex items-center'>
                                        <button onClick={() => handleAddToCart(USERID)} className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 text-orange shadow-sm hover:bg-orange/5 '>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                            Thêm vào giỏ hàng
                                        </button>
                                        <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-6 capitalize text-white shadow-sm outline-none bg-orange/90'>
                                            Mua ngay
                                        </button>
                                    </div>
                                    <div className='mt-10 flex items-center text-green-600 text-md gap-3'>
                                        <p className='capitalize text-gray-500 mr-3'>
                                            Vận chuyển: 
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                        </svg>
                                        {productDetailData.data.shippingInformation}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 bg-white p-4 shadow'>
                        <div className='container'>
                            <p className='rounded bg-gray-50 text-2xl capitalize  text-slate-700'>
                                Mô tả sản phẩm
                            </p>
                            <div className='mt-3 text-sm text-gray-500'>
                                <p>{productDetailData?.data.description}</p>
                                <p className='mt-3'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, optio velit. Illum odio soluta aliquid quibusdam, ex sapiente velit cum dolore esse cupiditate. Vitae dignissimos dolore distinctio labore aspernatur aperiam provident atque dicta velit, sunt ducimus maiores doloribus consequuntur, odio voluptates eveniet id? Voluptates illum deleniti minus accusamus, officia tenetur doloribus voluptate veniam, sequi vel sint quia est asperiores. Voluptatem aliquid beatae commodi modi natus dolore id deserunt eius aperiam. Debitis repudiandae itaque eum delectus, obcaecati nam adipisci ipsum voluptates! Reprehenderit, suscipit a tempora quam debitis praesentium cupiditate ratione adipisci. Necessitatibus reprehenderit, ipsum ratione doloribus similique asperiores ad harum excepturi.
                                </p>
                                <p className='mt-3'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora blanditiis voluptates accusamus aut impedit nostrum atque sed numquam eligendi corrupti alias autem earum obcaecati illo suscipit praesentium consectetur, error vitae quia in quis qui! Consequuntur, delectus! Temporibus velit commodi quod provident sunt reiciendis sequi, numquam aspernatur placeat dignissimos quasi officiis.
                                </p>
                                <p className='mt-3'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae, accusamus ea sapiente rerum quam iste dolore ut! Enim, voluptatum. Deserunt iusto omnis enim aliquam illo odit, fugit veniam praesentium debitis maiores, culpa incidunt ea voluptate! Mollitia cupiditate veritatis fugit. Ipsam, quas. Numquam quidem praesentium, molestiae corporis ea quia hic corrupti quaerat, minus itaque adipisci quis tempore dolor enim pariatur quam, aut illum sapiente ab. Esse vitae similique tempora odit.
                                </p>

                                <p className='mt-3'>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam ipsum doloremque eos corrupti, ullam at delectus rem voluptate sit odio, labore quidem veritatis nihil aperiam quo similique tempore quae ipsa odit accusantium praesentium! Sapiente ipsam sequi enim, ullam assumenda voluptatem, nulla consequuntur hic, pariatur mollitia eius ut perspiciatis ratione. Repellat aut, assumenda sequi ratione illo optio architecto. Debitis sint error commodi sunt repellendus soluta illo officia praesentium, esse qui quia.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='container'>
                            <h5 className='text-gray-600 uppercase'>Sản phẩm có liên quan</h5>
                            {productsData && productsData?.products && (
                                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6'>
                                    {productsData.products.map((item, index) => {
                                        return (
                                            <div className='col-span-1' key={index}>
                                                <Product item={item}></Product>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : 
                <div className='fixed z-50 left-[50%] top-[40%]'>
                    <HashLoader
                        color='#f78012' 
                        size={50}
                    />
                </div>
            }
        </div>
    )
};

export default ProductDetail
