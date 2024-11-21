import { ProductAddToCart } from "./products.type";

export interface Purchase {
    id: number;
    products: ProductAddToCart[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
};

export interface ExtendedPurchase extends Purchase {
    disable: boolean
    checked: boolean
}