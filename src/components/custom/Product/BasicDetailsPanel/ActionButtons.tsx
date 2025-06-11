"use client";
import React, { FC, useState } from "react";
import { Button } from "@/components/ui";
import { QuantityButton } from "@/components/custom/Product/BasicDetailsPanel/QuantityButton";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import Link from "next/link";
import { AddToCart } from "@/server/entities/actions";
import { useRouter } from "next/navigation";

interface ActionButtonProps extends BaseProps {
  quantity: number;
  productVariantId: string;
  isPresentInCart: boolean;
}

const ActionButtons: FC<ActionButtonProps> = (props) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const onQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  const addProductToCart = async (quantity: number) => {
    setIsDisabled(true);
    const addProductResult = await AddToCart(props.productVariantId, quantity);
    if (addProductResult.success) {
      router.refresh();
      setIsDisabled(false);
    } else {
      console.log(addProductResult.error);
    }
  };

  return (
    <div className={classNames("grid grid-cols-8 gap-5", props.className)}>
      {props.isPresentInCart ? (
        <>
          <Button
            className="hover:cursor-pointer rounded-4xl py-5 col-span-3 bg-vibrant-yellow font-semibold hover:bg-vibrant-yellow-bright"
            asChild
          >
            <Link href="/cart">Go to Cart</Link>
          </Button>
        </>
      ) : (
        <>
          <QuantityButton
            className="col-span-2 rounded-lg"
            min={1}
            max={Math.min(10, props.quantity)}
            quantity={quantity}
            setQuantity={setQuantity}
            onQuantityChange={onQuantityChange}
            isDisabled={isDisabled}
          />
          <Button
            className="hover:cursor-pointer rounded-4xl py-5 col-span-3 bg-vibrant-yellow font-semibold hover:bg-vibrant-yellow-bright"
            onClick={(e) => addProductToCart(quantity)}
            disabled={isDisabled}
          >
            Add to Cart
          </Button>
        </>
      )}
      <Button
        className="hover:cursor-pointer rounded-4xl py-5 col-span-3 bg-orange-600 font-semibold hover:bg-orange-700 hidden"
        disabled={isDisabled}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ActionButtons;
