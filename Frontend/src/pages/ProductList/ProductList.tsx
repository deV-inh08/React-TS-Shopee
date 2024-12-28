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
};

const ProductList = () => {
  const [queryConfig, setQueryConfig] = useState<QueryConfig>({
    skip: '0',
    limit: '15',
    search: "",
  });

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
    staleTime: 3 * 60 * 1000
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
  };
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
            <SortProductList queryConfig={queryConfig}></SortProductList>
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
                          color='#f78012' 
                          size={50}
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
