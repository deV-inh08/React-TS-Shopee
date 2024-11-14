import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import AsideFilter from '../../components/AsideFilter';
import SortProductList from '../../components/SortProductList';
import {HashLoader} from "react-spinners"
import productsAPI from '../../apis/product.api';
import { ProductListConfig, Product as ProductType } from '../../types/products.type';
import Product from '../../components/Product';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { sort_by, order } from '../../constants/product';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

const ProductList = () => {
  const [queryConfig, setQueryConfig] = useState<QueryConfig>({
    skip: '0',
    limit: '15',
    search: "",
  });

  const [searchTerm, setSeachTerm] = useState<string>("");


  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setQueryConfig({
      skip: searchParams.get("skip") || "0",
      limit: searchParams.get("limit") || "15",
      sortBy: searchParams.get("sortBy") || sort_by.stock,
      order: searchParams.get("order") || order.desc,
      category: searchParams.get("category") || '',
      search: searchParams.get("search") || '',
    })
    setSeachTerm(searchParams.get("search") || "")
  },[location.search])

  const { data: productData, isLoading } = useQuery({
    queryKey: ['/products', queryConfig],
    queryFn: () => {
      if(queryConfig.category) {
        return productsAPI.getProductsByCategory(queryConfig.category, queryConfig)
      } else if(queryConfig.search) {
        return productsAPI.searchProduct(queryConfig.search, queryConfig)
      }
      return productsAPI.getProducts(queryConfig) as Promise<ProductListConfig>
    },
  });

  const TOTALPAGE = productData?.total && productData?.limit ? Math.ceil(productData.total / parseInt(productData.limit)) : 0;

  const {data: categoriesData} = useQuery({
    queryKey: ['/categories'],
    queryFn: () => {
      return productsAPI.getCategories()
    }
  });
  const navigate = useNavigate();
  const handleCategoryClick = (category: string) => {
    setQueryConfig(prevConfig => {
      const updatedConfig = {
        ...prevConfig,
        category: category,
        skip: 0
      };
      navigate({
        pathname: location.pathname,
        search: `?category=${category}&skip=0&limit=${updatedConfig.limit}&sortBy=${updatedConfig.sortBy}&order=${updatedConfig.order}`,
      });
      return updatedConfig;
    });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSeachTerm(query); // Cập nhật state tìm kiếm
    setQueryConfig(prevConfig => {
      const updatedConfig = { ...prevConfig, search: query, skip: '0' };
      navigate({
        pathname: location.pathname,
        search: `?search=${query}&skip=0&limit=${updatedConfig.limit}&sortBy=${updatedConfig.sortBy}&order=${updatedConfig.order}&category=${updatedConfig.category}`,
      });
      return updatedConfig;
    });
  };


  // sort priceMin - priceMax
  // const filterProductBtPrice = (products: ProductType[], price_min: number, price_max: number) => {
  //   return products.filter((product) => {
  //     const price = product.price;
  //     return (price_min ? price_min < price : true) && (price_max ? price_max > price: true);
  //   })
  // }

  // const filteredProducts = (queryConfig.price_min && queryConfig.price_max) 
  //   ? filterProductBtPrice(productData.data || [], parseFloat(queryConfig.price_min), parseFloat(queryConfig.price_max))
  //   : productData.data

  // console.log(filteredProducts)
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
            {categoriesData && categoriesData.data && categoriesData.data.length > 0 && (
              <AsideFilter categories={categoriesData?.data} queryConfig={queryConfig} onCategoryClick={handleCategoryClick}></AsideFilter>
            )}
          </div>
          <div className='col-span-9 '>
            <div className="mb-4 ">
              <input
                type="text"
                value={searchTerm}
                placeholder='Free Ship Đơn Từ 0đ' 
                onChange={handleSearch}
                autoFocus // Gọi hàm tìm kiếm khi người dùng nhập
                className='absolute flex flex-grow border-none bg-transparent top-[59px] left-[400px] w-[850px] px-3 py-2 text-black outline-none'
              />
            </div>
            <SortProductList queryConfig={queryConfig} TOTALPAGE={TOTALPAGE}></SortProductList>
            {productData && productData.products && productData.products.length > 0 
              ? (
                <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-stretch'>
                  {productData.products.map((item: ProductType, index: number) => {
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
              productData && productData.products && productData.products.length > 0 && (
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
