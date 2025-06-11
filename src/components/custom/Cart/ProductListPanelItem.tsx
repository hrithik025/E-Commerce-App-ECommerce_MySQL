"use client";
import { ProductQuantityButton } from "@/components/custom/Cart/ProductQuantityButton";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { GetProductVariantsForCartSchema } from "@/server/types/CartProduct.type";
import { GetProductVariantImageDataSchema } from "@/server/types/ProductImage.type";
import { GetProductVariantImageData } from "@/server/entities/queries/ProductImage.query";

interface ProductListPanelItemProps extends BaseProps {
  productVariant: GetProductVariantsForCartSchema;
}

export const ProductListPanelItem: FC<ProductListPanelItemProps> = (props) => {
  const [cartProductImage, setCartProductImage] =
    useState<GetProductVariantImageDataSchema | null>(null);

  const loadImage = () => {
    GetProductVariantImageData(props.productVariant.ProductImageId).then(
      (result) => {
        if (result.success && result.data !== null) {
          setCartProductImage(result.data);
        }
      }
    );
  };

  useEffect(() => {
    loadImage();
  }, [props]);

  return (
    <div className={classNames("", props.className)}>
      <div className="flex gap-2">
        {cartProductImage !== null && (
          <img
            src={cartProductImage.Data}
            alt={props.productVariant.ProductName}
            className="object-cover h-[150px]"
          />
        )}
        <div className="grid grid-cols-8 items-center">
          <div className="flex flex-col gap-2 col-span-6">
            <span className="font-semibold">{`${props.productVariant.ProductLabel} (${props.productVariant.ProductVariantName})`}</span>
            <span>$ {props.productVariant.LatestPrice.toFixed(2)}</span>
            {/* {props.productVariant.categories.map((category, index) => ( */}
            <span key={0} className="text-sm">
              <span className="font-semibold">
                {props.productVariant.VariantCategoryLabel}:{" "}
              </span>
              <span>{props.productVariant.VariantCategoryValueLabel}</span>
            </span>
            {/* ))} */}
          </div>
          <ProductQuantityButton
            productVariantId={props.productVariant.ProductVariantId}
            quantity={props.productVariant.CartProductQuantity}
            maxQuantity={props.productVariant.Quantity}
          />
        </div>
      </div>
      <div className="flex justify-end font-semibold text-xl py-5">
        <span>$ {props.productVariant.LatestPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};
