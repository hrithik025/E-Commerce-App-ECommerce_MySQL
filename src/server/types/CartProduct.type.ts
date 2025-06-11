
export type GetProductVariantsForCartSchema = {
    ProductId: string;
    ProductVariantId: string;
    CartProductId: string;
    ProductName: string;
    ProductLabel: string;
    ProductCategoryName: string;
    ProductCategoryLabel: string;
    ProductVariantName: string;
    OriginalPrice: number;
    Quantity: number;
    CartProductQuantity: number;
    Discount: number;
    LatestPrice: number;
    VariantCategoryName: string;
    VariantCategoryLabel: string;
    VariantCategoryValueName: string;
    VariantCategoryValueLabel: string;
    ProductImageId: string;
}