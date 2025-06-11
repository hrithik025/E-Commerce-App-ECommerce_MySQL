import {
  LimitedTimeDealPanel,
  CarouselPanel,
  CategoryPanel,
} from "@/components/custom/Home/BannerSection";
import classNames from "classnames";
import React from "react";

export const BannerSection = () => {
  const commonClass = "shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.25)] rounded-sm";

  return (
    <div className="grid grid-cols-12 my-5 gap-5">
      <div
        className={classNames({
          "col-span-3": true,
          [commonClass]: true,
        })}
      >
        <CategoryPanel />
      </div>
      <div
        className={classNames({
          "col-span-6": true,
          [commonClass]: true,
        })}
      >
        <CarouselPanel />
      </div>
      <div
        className={classNames({
          "col-span-3": true,
          [commonClass]: false,
        })}
      >
        <LimitedTimeDealPanel />
      </div>
    </div>
  );
};
