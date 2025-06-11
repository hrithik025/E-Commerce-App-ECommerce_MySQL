export type ProductFiltersSchema = {
    search?: string;
    price?: string[];
    categories?: string[];
}

export type ShopURLSchema = {
    filters?: string;
    sortby?: string;
}