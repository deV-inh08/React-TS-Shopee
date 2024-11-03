export interface SuccessResponse<Data> {
    // products: SuccessResponse<ProductList> | undefined
    message: string
    data: Data
};

export interface ErrorResponse<Data> {
    message: string
    data ?: Data
}

