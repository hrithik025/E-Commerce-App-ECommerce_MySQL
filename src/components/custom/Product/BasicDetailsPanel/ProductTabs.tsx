import React, { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { AboutTab } from "@/components/custom/Product/BasicDetailsPanel/AboutTab";
import { ReviewsTab } from "@/components/custom/Product/BasicDetailsPanel/ReviewsTab";
import BaseProps from "@/lib/Props/BaseProps";

interface ProductTabProps extends BaseProps {
  productVariantId: string;
}

const ProductTabs: FC<ProductTabProps> = (props) => (
  <Tabs className="w-full" defaultValue="about">
    <TabsList className="grid grid-cols-2 gap-2 w-full bg-gray-200 py-1 box-content font-semibold rounded-lg">
      <TabsTrigger
        className="aria-selected:bg-white aria-selected:font-semibold aria-selected:text-black text-gray-500 rounded-lg py-2 hover:cursor-pointer aria-selected:shadow-md"
        value="about"
      >
        About the Product
      </TabsTrigger>
      <TabsTrigger
        value="reviews"
        className="aria-selected:bg-white aria-selected:font-semibold aria-selected:text-black text-gray-500 rounded-lg py-2 hover:cursor-pointer aria-selected:shadow-md"
      >
        Reviews
      </TabsTrigger>
    </TabsList>
    <AboutTab productVariantId={props.productVariantId} />
    <ReviewsTab productVariantId={props.productVariantId} />
  </Tabs>
);

export default ProductTabs;
