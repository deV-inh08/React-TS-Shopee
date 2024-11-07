import { Categories } from "../types/category.type";
import { SuccessResponse } from "../types/utils.type";
import httpProduct from "../utils/httpProduct";

const URL = "categories";

const categoriesApi = {
    getCaregories() {
        return httpProduct.get<SuccessResponse<Categories[]>>(`products/${URL}`)
    }
}


export default categoriesApi