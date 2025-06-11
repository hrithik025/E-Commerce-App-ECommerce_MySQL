"use client";
import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShopURLParams } from "@/app/shop/page";

interface ProductHeaderProps extends BaseProps {
  StartResultNumber: number;
  EndResultNumber: number;
  TotalNoOfResults: number;
  SortBy: string;
}

export const ProductHeader: FC<ProductHeaderProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  const onValueChange = (value: string) => {
    searchParams.set(ShopURLParams.SORTBY, value);
    router.push(pathname + "?" + searchParams);
  };

  return (
    <div
      className={classNames(
        "flex justify-between items-center",
        props.className
      )}
    >
      <span className="text-sm font-semibold">
        <span className="hidden">{`Showing ${props.StartResultNumber} - ${props.EndResultNumber} of ${props.TotalNoOfResults} results`}</span>
      </span>
      <Select defaultValue={props.SortBy} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-bold">Sort By</SelectLabel>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="priceLowToHigh">Price - Low to High</SelectItem>
            <SelectItem value="priceHighToLow">Price - High to Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
