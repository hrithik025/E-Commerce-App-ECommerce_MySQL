import React, { FC } from "react";
import BannerImage from "@public/static/banner_bg.jpg";
import Image from "next/image";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";

interface BannerBarProps extends BaseProps {
  title?: string;
}

export const BannerBar: FC<BannerBarProps> = (props) => {
  return !props.title ? (
    <div></div>
  ) : (
    <div className={classNames("relative", props.className)}>
      <Image
        src={BannerImage}
        alt="Banner_Image"
        className="h-40 object-center"
      ></Image>
      <div className="absolute top-0 h-40 flex items-center justify-center w-full">
        <span className="text-3xl font-semibold text-gray-700">
          {props.title}
        </span>
      </div>
    </div>
  );
};
