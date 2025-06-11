import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface ProductLayoutProps extends BaseProps {
  children: ReactNode;
}

const ProductLayout: FC<ProductLayoutProps> = (props) => {
  return (
    <div className={classNames("px-20 py-10", props.className)}>
      {props.children}
    </div>
  );
};

export default ProductLayout;
