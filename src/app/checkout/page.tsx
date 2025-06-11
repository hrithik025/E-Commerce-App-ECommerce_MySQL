"use client";
import React, { FC, useEffect, useState } from "react";
import BaseProps from "@/lib/Props/BaseProps";
import { useSearchParams } from "next/navigation";
import { PlaceOrder } from "@/server/entities/actions/Cart.action";
import Redirect from "@/components/custom/Checkout/Redirect";

export enum CheckOutURLParams {
  ADDRESS = "address",
  COUPON_CODE = "couponCode",
}

interface CheckOutProps extends BaseProps {}

const Cart: FC<CheckOutProps> = (props) => {
  const searchParams = useSearchParams();
  const address = searchParams.get(CheckOutURLParams.ADDRESS);
  const couponCode = searchParams.get(CheckOutURLParams.COUPON_CODE);

  const [isProcessing, setProcessing] = useState<boolean>(true);
  const [isOrderCompleted, setIsOrderCompleted] = useState<boolean>(false);

  const PlaceOrders = (address: string) => {
    PlaceOrder(address, couponCode)
      .then((result) => {
        if (result.success) {
          setIsOrderCompleted(true);
        }
      })
      .catch((reason) => {
        setIsOrderCompleted(false);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  useEffect(() => {
    if (address !== null && !isOrderCompleted) {
      PlaceOrders(address);
    }
  }, [address]);

  return (
    <>
      {isProcessing && (
        <>
          <span className="text-4xl font-semibold">
            Your Order is Processing...
          </span>
          <span className="text-gray-500">
            Please do-not refresh the page / Click on back Button
          </span>
        </>
      )}
      {!isProcessing && isOrderCompleted && (
        <>
          <span className="text-4xl font-semibold">
            Your Order is Placed Successfully!!!
          </span>
        </>
      )}
      {!isProcessing && !isOrderCompleted && (
        <>
          <span className="text-4xl font-semibold">
            Your Order could not be Placed {":("}
          </span>
          <span className="text-gray-500">
            Invalid Order!!! Please verify your cart and try again later. If
            same issue persists, Contact the administrator
          </span>
        </>
      )}
      {!isProcessing && (
        <Redirect isProcessing={isProcessing} link="/" seconds={10} />
      )}
    </>
  );
};

export default Cart;
