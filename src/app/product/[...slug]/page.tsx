import { BasicDetailsPanel, ImagePanel } from "@/components/custom/Product";
import React, { FC } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

// #region Images
import PhoneImage1 from "@public/static/Products/1-6.webp";
import PhoneImage2 from "@public/static/Products/2-1 (1).webp";
import PhoneImage3 from "@public/static/Products/3-1 (1).webp";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import {
  GetProductVariantDetails,
  GetProductVariantImages,
} from "@/server/entities/queries/ProductVariant.query";
import BaseProps from "@/lib/Props/BaseProps";
import {
  GetProductVariantDetailSchema,
  GetProductVariantImageSchema,
} from "@/server/types/ProductVariant.type";
import URLParamHandler from "@/lib/URLParamHandler";
import { FilterURLParams, ShopURLParams } from "@/app/shop/page";
// #endregion

interface ProductPageProps extends BaseProps {}

const ProductPage: FC<ProductPageProps> = async (props) => {
  const params = await props.params;
  const slug = params?.slug.join("/");

  let productVariantDetails: GetProductVariantDetailSchema | null = null;
  let productVariantImages: GetProductVariantImageSchema[] = [];

  if (slug !== undefined) {
    const productVariantId = decodeURIComponent(slug);
    let result = await GetProductVariantDetails(productVariantId);
    if (result.success) {
      let productVariantImageResult = await GetProductVariantImages(
        productVariantId
      );
      if (
        productVariantImageResult.success &&
        productVariantImageResult.data !== null
      ) {
        productVariantImages = productVariantImageResult.data;
      }
    }
    productVariantDetails = result.data;
  }

  if (productVariantDetails === null) {
    return <div>404 Not Found</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <ProductBreadcrumb
          ProductCategoryLabel={productVariantDetails.ProductCategoryLabel}
          ProductCategoryName={productVariantDetails.ProductCategoryName}
          ProductLabel={productVariantDetails.ProductLabel}
        />
        <ShopLink />
        <ImagePanel images={productVariantImages} />
        <BasicDetailsPanel
          className="border-l-2"
          productVariantDetails={productVariantDetails}
        />
      </div>
    </div>
  );
};

interface ProductBreadcrumbProps extends BaseProps {
  ProductCategoryName: string;
  ProductCategoryLabel: string;
  ProductLabel: string;
}

const ProductBreadcrumb: FC<ProductBreadcrumbProps> = (props) => {
  const getURL = (): string => {
    const urlParamHandler = new URLParamHandler();
    urlParamHandler.addOrUpdateParam(
      FilterURLParams.CATEGORIES,
      [props.ProductCategoryName],
      true
    );
    return `/shop?${ShopURLParams.FILTERS}=${urlParamHandler.encodeParams()}`;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href={"/"}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={getURL()}>{props.ProductCategoryLabel}</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{props.ProductLabel}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const ShopLink = () => (
  <div className="flex justify-end text-sm">
    <Link href={"/shop"} className="flex gap-1 items-center font-semibold">
      <IoIosArrowBack size={15} />
      <span>Shop</span>
    </Link>
  </div>
);

export default ProductPage;
