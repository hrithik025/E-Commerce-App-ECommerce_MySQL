import BaseProps from "@/lib/Props/BaseProps";
import { GetProductSpecifications } from "@/server/entities/queries/ProductSpecification.query";
import { GetProductSpecificationSchema } from "@/server/types/ProductSpecification.type";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

interface ProductDetailProps {
  Key: string;
  Value: string;
}

const ProductSpecification: React.FC<ProductDetailProps> = ({ Key, Value }) => (
  <>
    <div className="col-span-1 font-semibold border-r-[1px]">{Key}</div>
    <div className="col-span-3 text-justify">{Value}</div>
  </>
);

interface AboutTabProps extends BaseProps {
  productVariantId: string;
}

export const AboutTab: React.FC<AboutTabProps> = async (props) => {
  const productSpecificationsResult = await GetProductSpecifications(
    props.productVariantId
  );
  const ProductSpecifications: GetProductSpecificationSchema[] =
    productSpecificationsResult.success &&
    productSpecificationsResult.data !== null
      ? productSpecificationsResult.data
      : [];

  return (
    <TabsContent
      value="about"
      className="grid grid-cols-4 rounded-md shadow-normal p-4 gap-x-2 text-sm [&>div]:py-2"
    >
      {ProductSpecifications.map((detail, index) => (
        <ProductSpecification key={index} {...detail} />
      ))}
    </TabsContent>
  );
};
