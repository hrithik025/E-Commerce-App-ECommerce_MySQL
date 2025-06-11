import { BannerBar } from "@/components/custom/BannerBar/BannerBar";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface TrackOrderLayoutProps extends BaseProps {
  children: ReactNode;
}

const TrackOrderLayout: FC<TrackOrderLayoutProps> = (props) => {
  return (
    <div className={classNames("", props.className)}>
      <BannerBar title={"Track Order"} />
      {props.children}
    </div>
  );
};

export default TrackOrderLayout;
