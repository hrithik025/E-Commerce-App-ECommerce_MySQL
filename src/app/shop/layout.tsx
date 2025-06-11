import { BannerBar } from "@/components/custom/BannerBar/BannerBar";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface ShopLayoutProps extends BaseProps {
  children: ReactNode;
}

const ShopLayout: FC<ShopLayoutProps> = (props) => {
  return (
    <div className={classNames("", props.className)}>
      <BannerBar title={"Shop"} />
      {props.children}
    </div>
  );
};

export default ShopLayout;
