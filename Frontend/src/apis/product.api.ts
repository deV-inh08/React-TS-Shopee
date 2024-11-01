import { ProductListConfig, ProductList, Product} from "../types/products.type";
import httpProduct from "../utils/httpProduct";
import { SuccessResponse } from "../types/utils.type";

const URL = `/products`;

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
    return httpProduct.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },

  getProductDetail(id: string) {
    return httpProduct.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}


export default productsAPI