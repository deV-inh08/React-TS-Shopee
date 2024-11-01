import React from 'react'
import { Link } from 'react-router-dom';
import path from '../../constants/path';
import { Product as ProductType } from '../../types/products.type';
import ProductRating from '../ProductRating';


interface ProductProps {
    item: ProductType
}

const Product:React.FC<ProductProps> = React.memo(({item}) => {    
    const price = new Intl.NumberFormat("de-DE").format(item.price * 24000)
    const formatNumberSoical = (num: number) => {
      if(num > 1000) {
        return Math.round(num / 1000) + "k"
      }
      return num.toString()
    }
    return (
        <Link to={path.home}>
            <section className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform flex h-full justify-between flex-col'>
                <figure className='w-full pt-[100%] relative'>
                    <img 
                        src={item.images[0]} 
                        alt="product" 
                        className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                    />
                </figure>
                <article className='p-2 overflow-hidden'>
                    <p className='min-h-[1.75rem] line-clamp-2 text-sm'>
                       {item.title}
                    </p>
                    <div className='flex items-center mt-2'>
                        <div className='text-orange truncate ml-2 text-lg flex-shrink-0'>
                            <span className='text-xs'>₫</span>
                            <span>{price}</span>
                        </div>
                        <div className='text-orange text-sm px-1 bg-gray-200 ml-4 rounded-[2px] shrink-0'>
                            -{item.discountPercentage.toFixed(1)}%
                        </div>
                    </div>
                    <div className='flex items-center mt-2 gap-1'>
                        <ProductRating></ProductRating>
                        <span className='text-sm text-gray-500'>{item.rating.toFixed(1)}</span>
                        <div className='h-[15px] w-[1px] bg-gray-400'></div>
                        <div className='text-sm text-gray-500'>
                            <span>{formatNumberSoical(item.stock * 100)}</span>
                            <span className='ml-2'>Đã bán</span>
                        </div>
                    </div>
                    <div className='text-red-600 w-[80%] border-red-400 border-x border-y mt-1 text-ellipsis text-sm pl-1'>
                      Mua kèm deal sốc
                    </div>
                </article>
            </section>
        </Link>
    )
});

export default Product
