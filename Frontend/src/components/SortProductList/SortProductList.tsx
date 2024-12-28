import { sort_by, order as orderConstant } from '../../constants/product'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import { ProductListConfig } from '../../types/products.type'
import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '../../constants/path'
import omit from 'lodash/omit'


interface Props {
    queryConfig: QueryConfig,
}

const SortProductList = ({ queryConfig }: Props) => {
    const { sortBy = sort_by.stock } = queryConfig;
    const navigate = useNavigate()
    const isActivesortBy = (sortByValue: Exclude<ProductListConfig["sortBy"], undefined>) => {
        return sortBy == sortByValue
    };
    const handleSort = (sortByValue: Exclude<ProductListConfig["sortBy"], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
              omit(
                {
                    ...queryConfig,
                    sortBy: sortByValue,
                },
                ["order"]
            )).toString()
        });
    };
    const handlePriceOrder = (orderValue: Exclude<ProductListConfig["order"], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                sortBy: sort_by.price,
                order: orderValue
            }).toString()
        });
    };
    return (
        <div className='bg-gray-300/40 py-4 px-3'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex items-center flex-wrap gap-2'>
                    <p>Sắp xếp theo</p>
                    <button 
                        className={classNames("h-8 px-4 capitalize text-center", {
                            "bg-orange text-white hover:bg-orange/80" : isActivesortBy(sort_by.rating),
                            'bg-white text-black text-sm hover:bg-slate-100': !isActivesortBy(sort_by.rating)
                        })}
                        onClick={() => handleSort(sort_by.rating)}
                    >
                        Đánh giá
                    </button>
                    <button 
                        className={classNames("h-8 px-4 capitalize text-center", {
                            "bg-orange text-white hover:bg-orange/80" : isActivesortBy(sort_by.stock),
                            'bg-white text-black text-sm hover:bg-slate-100': !isActivesortBy(sort_by.stock)
                        })}
                        onClick={() => handleSort(sort_by.stock)}
                    >
                        Bán chạy
                    </button>
                    <select 
                        className="h-8 px-4 capitalize text-center bg-white text-black text-sm hover:bg-slate-100"
                        name="" 
                        id=""
                        onChange={event => {handlePriceOrder(event.target.value as Exclude<ProductListConfig["order"], undefined>)}}
                    >
                        <option value="">Giá</option>
                        <option value={orderConstant.desc}>Giá: Cao đến thấp</option>
                        <option value={orderConstant.asc}>Giá: Thấp đến cao</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SortProductList
