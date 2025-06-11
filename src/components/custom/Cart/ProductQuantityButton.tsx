"use client";
import { QuantityButton } from "@/components/custom/Product/BasicDetailsPanel/QuantityButton";
import BaseProps from "@/lib/Props/BaseProps";
import { AddToCart } from "@/server/entities/actions";
import classNames from "classnames";
import React, { FC, useState } from "react";

interface ProductQuantityButtonProps extends BaseProps {
  productVariantId: string;
  quantity: number;
  maxQuantity: number;
}

export const ProductQuantityButton: FC<ProductQuantityButtonProps> = (
  props
) => {
  const [quantity, setQuantity] = useState<number>(props.quantity);
  const [disabled, setDisabled] = useState<boolean>(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const onQuantityChange = async (quantity: number) => {
    setDisabled(true);
    const result = await AddToCart(props.productVariantId, quantity);
    if (result.success) {
      setQuantity(quantity);
      refreshPage();
    } else {
      console.log(result.error);
    }
  };

  return (
    <QuantityButton
      className={classNames("col-span-2 rounded-lg", props.className)}
      min={0}
      max={Math.min(10, props.maxQuantity)}
      quantity={quantity}
      setQuantity={setQuantity}
      isDisabled={disabled}
      onQuantityChange={onQuantityChange}
    />
  );
};
