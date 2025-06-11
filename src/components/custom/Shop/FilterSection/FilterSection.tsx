import { FilterAccordion } from "@/components/custom/Shop/FilterSection/FilterAccordion";
import { FilterClearButton } from "@/components/custom/Shop/FilterSection/FilterClearButton";
import { FilterHeader } from "@/components/custom/Shop/FilterSection/FilterHeader";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas/Product.schema";
import React, { FC } from "react";

interface FilterSectionProps extends BaseProps {
  Products: GetProductsForBrowseQueryResultSchema[];
}

export const FilterSection: FC<FilterSectionProps> = (props) => {
  return (
    <div className="col-span-3 flex flex-col h-fit sticky top-0">
      <div className="h-fit sticky top-0 bg-background z-20 mt-5">
        <FilterHeader />
      </div>
      <span className="text-lg font-semibold py-5 pb-2">Filters</span>
      <FilterAccordion Products={props.Products} />
      <FilterClearButton />
    </div>
  );
};
