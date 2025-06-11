import { FilterByCategory } from "@/components/custom/Shop/FilterSection/FilterByCategory";
import { FilterByPrice } from "@/components/custom/Shop/FilterSection/FilterByPrice";
import { Accordion } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas/Product.schema";
import { FC } from "react";

interface FilterAccordionProps extends BaseProps {
  Products: GetProductsForBrowseQueryResultSchema[];
}

export const FilterAccordion: FC<FilterAccordionProps> = async (props) => {
  const prices = props.Products.map((x) => parseFloat(x.NewPrice.toString()));

  return (
    <Accordion type="multiple" className="pb-5">
      <FilterByPrice
        minPrice={Math.min(...prices)}
        maxPrice={Math.max(...prices)}
      />
      <FilterByCategory />
    </Accordion>
  );
};
