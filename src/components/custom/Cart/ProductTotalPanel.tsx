import { AddressDialog } from "@/components/custom/Cart/AddressDialog";
import { CouponForm } from "@/components/custom/Cart/CouponForm";
import { IPriceField, PriceFields } from "@/components/custom/Cart/PriceFields";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Input,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductVariantsForCartSchema } from "@/server/types/CartProduct.type";
import classNames from "classnames";
import React, { FC } from "react";
import { CartURLSchema } from "@/server/types";
import { GetAddressById } from "@/server/entities/queries/Address.query";
import { GetCouponForCartByCouponCode } from "@/server/entities/queries/Coupon.query";
import { GetCouponSchema } from "@/server/types/Coupon.type";
import Link from "next/link";

interface ProductTotalPanelProps extends BaseProps {
  products: GetProductVariantsForCartSchema[];
}

enum TotalFieldValues {
  SUBTOTAL = "Subtotal",
  SHIPPING = "Shipping",
  DISCOUNT = "Discount",
  TOTAL = "Total",
}

export const ProductTotalPanel: FC<ProductTotalPanelProps> = async (props) => {
  const TotalFields: Map<string, number> = new Map();
  const searchParams = (await props.searchParams) as CartURLSchema;

  const GetCoupon = async () => {
    if (
      searchParams.couponCode !== null &&
      searchParams.couponCode !== undefined
    ) {
      const couponResult = await GetCouponForCartByCouponCode(
        searchParams.couponCode
      );
      if (couponResult.success) {
        return couponResult.data;
      }
    }
    return null;
  };

  const GetAddress = async () => {
    if (searchParams.address !== null && searchParams.address !== undefined) {
      const addressResult = await GetAddressById(searchParams.address);
      if (addressResult.success) {
        return addressResult.data;
      }
    }
    return null;
  };

  const computeSubTotal = () => {
    const subTotal = props.products
      .map((product) => product.OriginalPrice * product.CartProductQuantity)
      .reduce((prev, current) => prev + current, 0);
    TotalFields.set(TotalFieldValues.SUBTOTAL, subTotal);
  };

  const computeDiscount = () => {
    const discount = props.products
      .map(
        (product) =>
          (product.LatestPrice - product.OriginalPrice) *
          product.CartProductQuantity
      )
      .reduce((prev, current) => prev + current, 0);
    TotalFields.set(TotalFieldValues.DISCOUNT, discount);
  };

  const computeDiscountCoupons = (coupon: GetCouponSchema) => {
    const discount =
      (TotalFields.get(TotalFieldValues.SUBTOTAL) ?? 0) *
      (coupon.Discount / 100);

    TotalFields.set(`Coupons (${coupon.Discount}%)`, -discount);
  };

  const computeTax = () => {
    if (address) {
      const tax =
        (TotalFields.get(TotalFieldValues.SUBTOTAL) ?? 0) *
        ((address.CountryTaxRate + address.StateTaxRate) / 100);
      TotalFields.set(address.TaxTypeName, tax);
    }
  };

  const computeTotal = () => {
    let total = 0.0;
    TotalFields.forEach((price, key) => {
      total += price;
    });
    TotalFields.set(TotalFieldValues.TOTAL, total);
  };

  const computeTotalFields = () => {
    computeSubTotal();
    computeDiscount();
    if (coupon !== null) computeDiscountCoupons(coupon);
    computeTax();
    computeTotal();
  };

  const address = await GetAddress();
  const coupon = await GetCoupon();
  computeTotalFields();

  return (
    <div className={classNames("w-full", props.className)}>
      <div className="grid [&>*]:border-b-2 sticky top-0">
        <span className="uppercase font-semibold py-2 col-span-full border-b-2">
          Cart Totals
        </span>
        <Accordion type="multiple" defaultValue={["address"]}>
          <AccordionItem value="coupon">
            <AccordionTrigger>Add a Coupon</AccordionTrigger>
            <AccordionContent className="p-2">
              <CouponForm defaultValue={searchParams.couponCode} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="address">
            <AccordionTrigger>Select the Delivery Option</AccordionTrigger>
            <AccordionContent className="p-2">
              <AddressDialog {...props} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <PriceFields
          fields={TotalFields}
          className="[&>*]:nth-last-[-n+2]:font-bold [&>*]:nth-last-[-n+2]:text-xl"
        />
        <Link
          href={
            address === null
              ? "#"
              : `/checkout?${new URLSearchParams(searchParams).toString()}`
          }
          className="my-2"
        >
          <Button
            className=" w-full py-5 hover:cursor-pointer rounded-md font-semibold bg-default hover:bg-default-bright"
            disabled={address === null}
          >
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};
