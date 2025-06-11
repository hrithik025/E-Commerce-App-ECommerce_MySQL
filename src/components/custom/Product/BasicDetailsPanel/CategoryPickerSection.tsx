import {
  CategoryPicker,
  ICategory,
} from "@/components/custom/Product/BasicDetailsPanel/CategoryPicker";
import BaseProps from "@/lib/Props/BaseProps";
import React, { FC } from "react";

interface CategoryPickerSectionProps extends BaseProps {
  categories: Array<ICategory>;
}

export const CategoryPickerSection: FC<CategoryPickerSectionProps> = (
  props
) => {
  return (
    <div className="space-y-4">
      {props.categories.map((category, index) => (
        <CategoryPicker
          key={index}
          name={category.name}
          items={category.items}
        />
      ))}
    </div>
  );
};
