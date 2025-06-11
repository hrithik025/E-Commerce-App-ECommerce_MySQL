import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC } from "react";

interface ProductListHeaderProps extends BaseProps {}

export const ProductListHeader: FC<ProductListHeaderProps> = (props) => {
  return (
    <div className={classNames("", props.className)}>
      <span>Product</span>
      <span>Total</span>
    </div>
  );
};
