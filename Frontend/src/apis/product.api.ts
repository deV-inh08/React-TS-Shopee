import { ProductListConfig, ProductList, Product} from "../types/products.type";
import httpProduct from "../utils/httpProduct";
import { SuccessResponse } from "../types/utils.type";
import { Categories as CategoriesType } from "../types/category.type";

const URL = `products`;


const productsAPI = {
  getProducts(params: ProductListConfig) {
    return httpProduct.get<SuccessResponse<ProductList>>(URL, { params }).then((response) => {
      return response.data
    })
  },

  getProductDetail(id: string) {
    return httpProduct.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },

  getCategories() {
    return httpProduct.get<SuccessResponse<CategoriesType>>("products/categories")
  },

  getProductsByCategory(category: string, params?: ProductListConfig) {
    return httpProduct.get<SuccessResponse<ProductList>>(`products/category/${category}`, { params }).then((respose) => {
      return respose.data
    })
  },

  searchProduct(query: string) {
    return httpProduct.get<SuccessResponse<ProductList>>(`products/search?q=${query}`).then((response) => {
      return response.data;
    })
  }
}


export default productsAPI