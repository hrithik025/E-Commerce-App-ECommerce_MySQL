import {
  ICategoryItem,
  CategoryItem,
} from "@/components/custom/Product/BasicDetailsPanel/CategoryItem";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React from "react";

export interface ICategory {
  name: string;
  items: Array<ICategoryItem>;
}

interface CategoryPickerProps extends BaseProps, ICategory {}

export const CategoryPicker: React.FC<CategoryPickerProps> = (props) => {
  return (
    <div className={classNames("flex flex-col space-y-3", props.className)}>
      <span className="font-semibold">{props.name}</span>
      <ul className="flex space-x-2">
        {props.items.map((item, index) => (
          <CategoryItem
            key={index}
            categoryName={props.name}
            uniqueKey={`${item.value}-${index}`}
            uniqueId={index}
            value={item.value}
            name="category"
            defaultChecked={item.defaultChecked}
            productVariantId={item.productVariantId}
          >
            {item.name}
          </CategoryItem>
        ))}
      </ul>
    </div>
  );
};
