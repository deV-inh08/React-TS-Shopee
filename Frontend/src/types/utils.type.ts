export interface SuccessResponse<Data> {
    // products: SuccessResponse<ProductList> | undefined
    message: string
    data: Data
};

export interface ErrorResponse<Data> {
    message: string
    data ?: Data
};

export type NoUndefinedField<T> = {
    [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
};

