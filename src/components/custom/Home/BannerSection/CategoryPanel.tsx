import { FilterURLParams, ShopURLParams } from "@/app/shop/page";
import BaseProps from "@/lib/Props/BaseProps";
import URLParamHandler from "@/lib/URLParamHandler";
import { GetProductCategories } from "@/server/entities/queries";
import classNames from "classnames";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface CategoryPanelItemProps extends BaseProps {
  name: string;
  label: string;
  children: ReactNode;
}

const CategoryPanelItem: FC<CategoryPanelItemProps> = (props) => {
  const getURL = (): string => {
    const urlParamHandler = new URLParamHandler();
    urlParamHandler.addOrUpdateParam(
      FilterURLParams.CATEGORIES,
      [props.name],
      true
    );
    return `/shop?${ShopURLParams.FILTERS}=${urlParamHandler.encodeParams()}`;
  };

  return (
    <Link href={getURL()} className={classNames("", props.className)}>
      <div className="py-3 px-2 border-b-2 hover:bg-gray-400/20 font-semibold">
        {props.children}
      </div>
    </Link>
  );
};

export const CategoryPanel = async () => {
  const productCategories = (await GetProductCategories()).slice(0, 9);

  return (
    <div className="px-5 py-3">
      <div className="bg-default flex justify-center text-white py-3 uppercase font-semibold">
        Top Categories
      </div>
      <div className="py-2">
        {productCategories.map((productCategory, idx) => (
          <CategoryPanelItem
            key={idx}
            name={productCategory.Name}
            label={productCategory.Label}
          >
            {productCategory.Label}
          </CategoryPanelItem>
        ))}
      </div>
    </div>
  );
};
