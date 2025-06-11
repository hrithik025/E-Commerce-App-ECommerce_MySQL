import { FilterSection, ProductsSection } from "@/components/custom/Shop";
import BaseProps from "@/lib/Props/BaseProps";
import React, { FC } from "react";
import { GetProductsForBrowse } from "@/server/entities/queries/Product.query";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas/Product.schema";
import URLParamHandler from "@/lib/URLParamHandler";
import { ShopURLSchema } from "@/server/types";
// import { headers } from "next/headers";

export enum ShopURLParams {
  FILTERS = "filters",
  SORTBY = "sortby",
}

export enum FilterURLParams {
  SEARCH = "search",
  PRICE = "price",
  CATEGORIES = "categories",
}

interface ShopProps extends BaseProps {}

const Shop: FC<ShopProps> = async (props) => {
  const searchParams = (await props.searchParams) as ShopURLSchema;

  const filterParams = new URLParamHandler(searchParams.filters).searchParams;

  const ApplyPriceFilter = (
    item: GetProductsForBrowseQueryResultSchema
  ): boolean => {
    if (filterParams.price !== undefined && filterParams.price.length > 0) {
      let priceFilter = new Array(
        parseFloat(filterParams.price[0]),
        parseFloat(filterParams.price[1])
      );
      return item.NewPrice >= priceFilter[0] && item.NewPrice <= priceFilter[1];
    }
    return true;
  };

  const ApplyCategoryFilter = (
    item: GetProductsForBrowseQueryResultSchema
  ): boolean => {
    if (
      filterParams.categories !== undefined &&
      filterParams.categories.length > 0
    ) {
      return filterParams.categories.includes(item.ProductCategoryName);
    }
    return true;
  };

  const ApplySearchFilter = (
    item: GetProductsForBrowseQueryResultSchema
  ): boolean => {
    if (filterParams.search !== undefined && filterParams.search.length > 0) {
      return item.ProductName.includes(filterParams.search.toLowerCase());
    }
    return true;
  };

  const ProductFilterFn = (
    item: GetProductsForBrowseQueryResultSchema
  ): boolean => {
    return (
      ApplyPriceFilter(item) &&
      ApplyCategoryFilter(item) &&
      ApplySearchFilter(item)
    );
  };

  const products: GetProductsForBrowseQueryResultSchema[] =
    await GetProductsForBrowse(ProductFilterFn, searchParams.sortby);

  return (
    <div className="px-20 py-5 grid grid-cols-12 gap-5">
      <FilterSection Products={products} />
      <ProductsSection
        {...props}
        StartResultNumber={1}
        EndResultNumber={12}
        TotalNoOfResults={15}
        Products={products}
      />
    </div>
  );
};

export default Shop;
