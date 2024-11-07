import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import AsideFilter from '../../components/AsideFilter';
import SortProductList from '../../components/SortProductList';
import {HashLoader} from "react-spinners"
// import { useQueryParams } from "use-query-params"
import productsAPI from '../../apis/product.api';
import { ProductListConfig, Product as ProductType } from '../../types/products.type';
import Product from '../../components/Product';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation } from 'react-router-dom';
import { sort_by, order } from '../../constants/product';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
  const [queryConfig, setQueryConfig] = useState<QueryConfig>({
    skip: '0',
    limit: '15',
    // sortBy: "rating",
    // order: "desc",
    // rating: undefined,
    // title: undefined,
  })

  // const [getProducts, setGetProducts] = useState<ProductProps>({
  //   products: [],
  //   total: 0,
  //   limit: 15
  // });
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const {products, total, limit} = getProducts
  // const totalPages = Math.ceil(total / limit)
  

  // const queryParams: QueryConfig = useQueryParams();
  // const queryConfig: QueryConfig = omitBy({
  //   skip: queryParams.skip || "0",
  //   limit: queryParams.limit || "15",
  //   sortBy: queryParams.sortBy,
  //   order: queryParams.order,
  //   rating: queryParams.rating,
  //   title: queryParams.title
  // }, isUndefined);

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setQueryConfig({
      skip: searchParams.get("skip") || "0",
      limit: searchParams.get("limit") || "15",
      sortBy: searchParams.get("sortBy") || sort_by.stock,
      order: searchParams.get("order") || order.desc,
    })
  },[location.search])

  const { data, isLoading } = useQuery({
    queryKey: ['/products', queryConfig],
    queryFn: () => productsAPI.getProducts(queryConfig) as Promise<ProductListConfig>,
  });
  const TOTALPAGE = data?.total && data?.limit ? Math.ceil(data.total / parseInt(data.limit)) : 0;

  // useEffect(() => {
  //       const loadingProducts = async () => {
  //         setIsLoading(true)
  //           try {
  //               const data = await productsAPI.getProducts(nextPage);
  //               if(JSON.stringify(data) !== JSON.stringify(getProducts)) {
  //                 return setGetProducts(data)
  //               }
  //           } catch(error) {
  //               console.log("Failed to load products", error)
  //           } finally {
  //             setIsLoading(false)
  //           }
  //       } 
  //       loadingProducts()
  // }, [nextPage]);

  // const handlePageChange = (newPage: number) => {
  //   if(newPage <= TOTALPAGE) {
  //     setNextPage(newPage)
  //   } else {
  //     setNextPage(1)
  //   }
  // };
  
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter></AsideFilter>
          </div>
          <div className='col-span-9 '>
            <SortProductList queryConfig={queryConfig} TOTALPAGE={TOTALPAGE}></SortProductList>
            {data && data.products && data.products.length > 0 
              ? (
                <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-stretch'>
                  {data.products.map((item: ProductType, index: number) => {
                    return (
                      <div key={index} className='col-span-1'>
                        <Product item={item} />
                      </div>
                    );
                  })}
                </div>
              ) 
              : (
                <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-stretch'>
                  <div className='fixed z-50 left-[59%] top-[40%]'>
                        <HashLoader
                          loading={isLoading}
                          color='#f78012' // Màu cam
                          size={50} // Kích thước của loader (có thể tùy chỉnh)
                        />
                  </div>
                </div>
            )}
            
            {
              data && data.products && data.products.length > 0 && (
                <article className='mx-auto'>
                  <Pagination
                    TOTALPAGE= {TOTALPAGE}
                    queryConfig= {queryConfig}
                  ></Pagination>
                </article>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductList;
