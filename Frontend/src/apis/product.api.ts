import { ProductListConfig, ProductList, Product} from "../types/products.type";
import httpProduct from "../utils/httpProduct";
import { SuccessResponse } from "../types/utils.type";
import { Categories as CategoriesType } from "../types/category.type";

const URL = `products`;

// const limit = 15
// const productsAPI = {
//   getProducts: async (page: number = 1) => {
//     const skip = (page - 1) * limit;
//     try {
//         const response = await httpProduct.get(`${URL}?limit=${limit}&skip=${skip}`);
//         return response.data
//     } catch(error) {
//         console.log("Error fetching products", error)
//         throw error
//     }
//   },
//   getProductsDetail:  async (id: string) => {
//     return httpProduct.get(`${URL}/${id}`)
//  }
// }


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

  getProductsByCategory(category: string, params: ProductListConfig) {
    return httpProduct.get<SuccessResponse<ProductList>>(`products/category/${category}`, { params }).then((respose) => {
      return respose.data
    })
  }
}


export default productsAPI