import { BannerBar } from "@/components/custom/BannerBar/BannerBar";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface CartLayoutProps extends BaseProps {
  children: ReactNode;
}

const CartLayout: FC<CartLayoutProps> = (props) => {
  return (
    <div className={classNames("", props.className)}>
      <BannerBar title={"Cart"} />
      {props.children}
    </div>
  );
};

export default CartLayout;
