import { ProductListConfig } from '../types/products.type';
import { useQueryParams } from 'use-query-params';
import { isUndefined, omitBy } from 'lodash';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
} 

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams();

  const queryConfig: QueryConfig = omitBy(
    {
      skip: queryParams.skip || "15",
      limit: queryParams.limit || "15",
      order: queryParams.order || "desc",
      sortBy: queryParams.sortBy || "rating",
      category: queryParams.category,
      search: queryParams.search,
    }
    ,isUndefined
  )
  return queryConfig
};

export default useQueryConfig;
