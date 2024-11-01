// import React, {useEffect, useState} from 'react'
import AsideFilter from '../../components/AsideFilter';
import SortProductList from '../../components/SortProductList';
import productsAPI from '../../apis/product.api';
import { ProductList, ProductListConfig } from '../../types/products.type';
// import Nextpage from '../../components/Pagination';
// import {HashLoader} from "react-spinners"
import useQueryParams from '../../hooks/useQueryParams';
import { useQuery } from '@tanstack/react-query';
import Product from '../../components/Product';


// type ProductProps = {
//   products: ProductType[]
//   total: number
//   limit: number
// }

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
  // const [getProducts, setGetProducts] = useState<ProductProps>({
  //   products: [],
  //   total: 0,
  //   limit: 15
  // });
  // const [nextPage, setNextPage] = useState<number>(1);
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const {products, total, limit} = getProducts

  // const totalPages = Math.ceil(total / limit)

  const queryParams = useQueryParams();
  // const queryConfig: QueryConfig = {
  //   skip: queryParams.skip || "0",
  //   limit: queryParams.limit || "15",
  //   sortBy: queryParams.sortBy,
  //   order: queryParams.order,
  //   rating: queryParams.rating,
  //   title: queryParams.title
  // }


  const { data } = useQuery<ProductList | undefined>({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productsAPI.getProducts(queryParams)
    }
  });

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
  //   if(newPage <= totalPages) {
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
            <SortProductList></SortProductList>
              {/* {isLoading 
                ? (
                    <div className='fixed inset-0 bg-gray-300 bg-opacity-60 flex items-center justify-center z-50'>
                      <HashLoader
                        loading={isLoading}
                        color='#f78012' // Màu cam
                        size={50} // Kích thước của loader (có thể tùy chỉnh)
                      />
                    </div>
                  )
                : (
                  <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-stretch'>
                    {data && data.data.data.products.map((item, index) => {
                      return (
                        <div className='col-span-1' key={index}>
                          <Product item={item}></Product>
                        </div>
                      )
                    })}
                  </div>
                )  
              } */}
              {/* <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-stretch'>
                    {data && data.data.data.products}
              </div> */}
            <article className='mx-auto'>
              {/* <Nextpage
                page= {nextPage}
                onPageChange= {handlePageChange}
                totalPages= {totalPages}
                setNextPage={setNextPage}
              ></Nextpage> */}
            </article>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductList;
