"use client";
import { Button } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";

interface QuantityButtonProps extends BaseProps {
  max: number;
  min: number;
  initialValue?: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onQuantityChange: (quantity: number) => void;
  isDisabled: boolean;
}

export const QuantityButton: FC<QuantityButtonProps> = (props) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-3 col-span-1 place-items-center border-2 rounded-4xl overflow-hidden",
        props.className
      )}
    >
      <Button
        className="col-span-1 text-lg font-semibold w-full rounded-none hover:cursor-pointer py-5"
        disabled={props.quantity <= props.min || props.isDisabled}
        onClick={(e) => props.onQuantityChange(props.quantity - 1)}
      >
        -
      </Button>
      <span className="col-span-1">{props.quantity}</span>
      <Button
        className="col-span-1 text-lg font-semibold w-full rounded-none hover:cursor-pointer py-5"
        disabled={props.quantity >= props.max || props.isDisabled}
        onClick={(e) => props.onQuantityChange(props.quantity + 1)}
      >
        +
      </Button>
    </div>
  );
};
