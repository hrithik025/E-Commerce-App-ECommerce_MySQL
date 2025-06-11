import { ProductListPanel, ProductTotalPanel } from "@/components/custom/Cart";
import React, { FC } from "react";
import { GetProductVariantsForCart } from "@/server/entities/queries/CartProduct.query";
import { GetProductVariantsForCartSchema } from "@/server/types/CartProduct.type";
import BaseProps from "@/lib/Props/BaseProps";
import { BsCartX } from "react-icons/bs";
import Link from "next/link";
import { Button } from "@/components/ui";

export enum CartURLParams {
  ADDRESS = "address",
  COUPON_CODE = "couponCode",
}

interface CartProps extends BaseProps {}

const Cart: FC<CartProps> = async (props) => {
  const result = await GetProductVariantsForCart();
  let cartProducts: GetProductVariantsForCartSchema[] = [];

  if (result.success && result.data !== null) {
    cartProducts = result.data;
  }

  if (cartProducts.length === 0) {
    return (
      <div className="h-60 flex items-center gap-5 flex-col justify-center text-gray-500">
        <BsCartX size={100} />
        <span className="text-xl font-semibold">
          No Items Present in the Cart
        </span>
        <Link href="/shop">
          <Button className="hover:cursor-pointer bg-default hover:bg-default-bright text-white font-semibold">
            Add Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-20 py-5 grid grid-cols-12 gap-5">
      <ProductListPanel className="col-span-8" products={cartProducts} />
      <ProductTotalPanel
        className="col-span-4"
        products={cartProducts}
        {...props}
      />
    </div>
  );
};

export default Cart;
