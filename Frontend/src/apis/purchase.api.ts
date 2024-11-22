import { Purchase } from "../types/purchase.type";
import { SuccessResponse } from "../types/utils.type";
import httpProduct from "../utils/httpProduct";

const URL = 'carts';

interface productCart {
    id: number
    quantity: number
}

const purchaseAPI = {
    addToCart(body: { userId: number, products: productCart[] }) {
        return httpProduct.post<SuccessResponse<Purchase>>(`${URL}/add`, body);
    },      
};

export default purchaseAPI;