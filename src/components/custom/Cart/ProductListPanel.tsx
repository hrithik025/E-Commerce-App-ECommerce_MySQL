import { ProductListHeader } from "@/components/custom/Cart/ProductListHeader";
import { ProductListPanelItem } from "@/components/custom/Cart/ProductListPanelItem";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductVariantsForCartSchema } from "@/server/types/CartProduct.type";
import classNames from "classnames";
import React, { FC } from "react";

interface ProductListPanelProps extends BaseProps {
  products: GetProductVariantsForCartSchema[];
}

export const ProductListPanel: FC<ProductListPanelProps> = (props) => {
  return (
    <div className={classNames("", props.className)}>
      <div className="px-5 [&>*]:grid [&>*]:grid-cols-6 [&>*]:border-b-2 [&>*]:py-2 [&>*>*]:first:col-span-5 [&>*>*]:last:col-span-1 [&>*>*]:last:text-right">
        <ProductListHeader className="uppercase font-semibold" />
        {props.products.map((product, index) => (
          <ProductListPanelItem key={index} productVariant={product} />
        ))}
      </div>
    </div>
  );
};
