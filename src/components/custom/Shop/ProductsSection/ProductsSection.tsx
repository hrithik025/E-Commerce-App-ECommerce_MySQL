"use server";
import { ProductHeader } from "@/components/custom/Shop/ProductsSection/ProductHeader";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC } from "react";
import { headers } from "next/headers";
import { ShopURLParams } from "@/app/shop/page";
import { ProductGrid } from "@/components/custom/Shop/ProductsSection/ProductGrid";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas/Product.schema";

interface ProductsSectionProps extends BaseProps {
  StartResultNumber: number;
  EndResultNumber: number;
  TotalNoOfResults: number;
  Products: GetProductsForBrowseQueryResultSchema[];
}

export const ProductsSection: FC<ProductsSectionProps> = async (props) => {
  const headersList = await headers();
  const searchParams = new URLSearchParams(
    headersList.get("x-searchParams") ?? ""
  );

  const defaultSortBy = "popularity";
  const sortParam = searchParams.get(ShopURLParams.SORTBY) ?? defaultSortBy;

  return (
    <div className={classNames("col-span-9", props.className)}>
      <div className="pt-5 pb-2 sticky top-0 h-fit z-20 bg-background">
        <ProductHeader
          StartResultNumber={props.StartResultNumber}
          EndResultNumber={props.EndResultNumber}
          TotalNoOfResults={props.TotalNoOfResults}
          SortBy={sortParam}
        />
      </div>
      <ProductGrid Products={props.Products} />
    </div>
  );
};
