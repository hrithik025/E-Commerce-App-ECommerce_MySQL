import { ProductProps } from "@/lib/Props/ProductProps";
import classNames from "classnames";
import { FC } from "react";
import ProductName from "@/components/custom/Product/BasicDetailsPanel/ProductName";
import ProductDescription from "@/components/custom/Product/BasicDetailsPanel/ProductDescription";
import ProductRating from "@/components/custom/Product/BasicDetailsPanel/ProductRating";
import ProductPrice from "@/components/custom/Product/BasicDetailsPanel/ProductPrice";
import ActionButtons from "@/components/custom/Product/BasicDetailsPanel/ActionButtons";
import ProductTabs from "@/components/custom/Product/BasicDetailsPanel/ProductTabs";
import { CategoryPickerSection } from "@/components/custom/Product/BasicDetailsPanel/CategoryPickerSection";
import {
  GetProductVariantCategoriesSchema,
  GetProductVariantDetailSchema,
} from "@/server/types/ProductVariant.type";
import { GetProductVariantCategories } from "@/server/entities/queries/ProductVariant.query";
import { ArrayExtension } from "@/server/lib/ArrayExtension";
import { ICategory } from "@/components/custom/Product/BasicDetailsPanel/CategoryPicker";
import { ICategoryItem } from "@/components/custom/Product/BasicDetailsPanel/CategoryItem";
import BaseProps from "@/lib/Props/BaseProps";

interface BasicDetailsProps extends BaseProps {
  productVariantDetails: GetProductVariantDetailSchema;
}

export const BasicDetailsPanel: FC<BasicDetailsProps> = async (props) => {
  const GetProductVariantCategoriesFromServer = async (): Promise<
    ICategory[]
  > => {
    const productVariantCategories: ICategory[] = [];

    const result = await GetProductVariantCategories(
      props.productVariantDetails.ProductVariantId
    );

    if (result.success && Array.isArray(result.data)) {
      const categories =
        ArrayExtension.GroupBy<GetProductVariantCategoriesSchema>(
          result.data,
          (item) => item.VariantCategoryName
        );
      categories.forEach((valueArray, category) => {
        const items: ICategoryItem[] = [];
        valueArray.forEach((value) =>
          items.push({
            name: value.VariantCategoryValueLabel,
            value: value.VariantCategoryValueName,
            defaultChecked: value.IsSelected,
            productVariantId: value.ProductVariantId,
          })
        );

        productVariantCategories.push({
          name: valueArray[0].VariantCategoryLabel,
          items: items,
        });
      });
    }

    return productVariantCategories;
  };

  const productVariantCategories =
    await GetProductVariantCategoriesFromServer();

  if (productVariantCategories === null) {
    return <div></div>;
  }

  return (
    <div
      className={classNames(
        "px-5 py-5 flex flex-col space-y-5",
        props.className
      )}
    >
      <ProductName
        name={`${props.productVariantDetails.ProductLabel} (${props.productVariantDetails.ProductVariantName})`}
      />
      <ProductDescription
        description={props.productVariantDetails.Description}
      />
      <ProductRating
        rating={
          props.productVariantDetails.NoOfStars !== 0
            ? props.productVariantDetails.NoOfStars
            : 5
        }
      />
      <CategoryPickerSection categories={productVariantCategories} />
      <ProductPrice
        discount={props.productVariantDetails.Discount}
        originalPrice={props.productVariantDetails.OriginalPrice}
        latestPrice={props.productVariantDetails.LatestPrice}
        isWishlisted={props.productVariantDetails.IsWishlisted}
        ProductVariantId={props.productVariantDetails.ProductVariantId}
      />
      <ActionButtons
        quantity={props.productVariantDetails.Quantity}
        productVariantId={props.productVariantDetails.ProductVariantId}
        isPresentInCart={props.productVariantDetails.IsPresentInCart}
      />
      <ProductTabs
        productVariantId={props.productVariantDetails.ProductVariantId}
      />
    </div>
  );
};
