
export type GetProductVariantDetailSchema = {
    ProductId: string;
    ProductVariantId: string;
    ProductName: string;
    ProductLabel: string;
    ProductCategoryName: string;
    ProductCategoryLabel: string;
    ProductVariantName: string;
    OriginalPrice: number;
    Quantity: number;
    Discount: number;
    LatestPrice: number;
    NoOfStars: number;
    NoOfReviews: number;
    VariantCategoryName: string;
    VariantCategoryLabel: string;
    VariantCategoryValueName: string;
    VariantCategoryValueLabel: string;
    IsPresentInCart: boolean;
    IsWishlisted: boolean;
    Description: string;
}

export type GetProductVariantCategoriesSchema = {
    ProductVariantId: string;
    VariantCategoryConfigId: string;
    VariantCategoryName: string;
    VariantCategoryLabel: string;
    VariantCategoryValueName: string;
    VariantCategoryValueLabel: string;
    IsSelected: boolean;
}

export type GetProductVariantImageSchema = {
    Id: string;
}