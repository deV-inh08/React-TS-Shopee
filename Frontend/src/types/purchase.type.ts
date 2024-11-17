import { ProductAddToCart } from "./products.type";

interface Purchase {
    id: number;
    products: ProductAddToCart[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
};

export default Purchase;