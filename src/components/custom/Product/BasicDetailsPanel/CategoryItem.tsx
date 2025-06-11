import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

export interface ICategoryItem {
  value: string;
  name: string;
  defaultChecked: boolean;
  productVariantId: string;
}

interface CategoryItemProps extends BaseProps, ICategoryItem {
  categoryName: string;
  uniqueId: number;
  uniqueKey: string;
  children: React.ReactNode;
}

export const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  return (
    <li key={props.uniqueId} className={classNames("", props.className)}>
      <Link href={`/product/${props.productVariantId}`}>
        <input
          type="radio"
          name={props.categoryName}
          id={`radio-option-${props.uniqueKey}`}
          className="peer hidden"
          value={props.value}
          defaultChecked={props.defaultChecked}
        />
        <label
          htmlFor={`radio-option-${props.uniqueKey}`}
          className="hover:cursor-pointer px-4 py-1 rounded-sm border-2 border-gray-400 text-gray-500 peer-checked:font-semibold peer-checked:bg-default peer-checked:border-default peer-checked:text-white"
        >
          {props.children}
        </label>
      </Link>
    </li>
  );
};
