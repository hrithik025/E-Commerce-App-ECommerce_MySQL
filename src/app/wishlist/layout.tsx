import { BannerBar } from "@/components/custom/BannerBar/BannerBar";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface WishlistLayoutProps extends BaseProps {
  children: ReactNode;
}

const WishlistLayout: FC<WishlistLayoutProps> = (props) => {
  return (
    <div className={classNames("", props.className)}>
      <BannerBar title={"Wishlist"} />
      {props.children}
    </div>
  );
};

export default WishlistLayout;
