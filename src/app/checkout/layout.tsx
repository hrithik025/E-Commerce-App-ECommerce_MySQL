import { BannerBar } from "@/components/custom/BannerBar/BannerBar";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface CheckOutLayoutProps extends BaseProps {
  children: ReactNode;
}

const CheckoutLayout: FC<CheckOutLayoutProps> = (props) => {
  return (
    <div className={classNames("", props.className)}>
      <BannerBar title={"Checkout"} />
      <div className="flex items-center gap-5 flex-col h-60 justify-center">
        {props.children}
      </div>
    </div>
  );
};

export default CheckoutLayout;
