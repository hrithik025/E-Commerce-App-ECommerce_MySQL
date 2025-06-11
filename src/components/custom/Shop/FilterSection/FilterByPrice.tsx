"use client";
import { FilterURLParams, ShopURLParams } from "@/app/shop/page";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  TwoSidedSlider,
} from "@/components/ui/";
import BaseProps from "@/lib/Props/BaseProps";
import URLParamHandler from "@/lib/URLParamHandler";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

interface FilterByPriceProps extends BaseProps {
  minPrice: number;
  maxPrice: number;
}

export const FilterByPrice: FC<FilterByPriceProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  const urlParamHandler = new URLParamHandler(
    searchParams.get(ShopURLParams.FILTERS)?.toString()
  );

  const defaultPriceFilter: string[] | undefined = urlParamHandler.getParam(
    FilterURLParams.PRICE
  ) as string[];

  const onSliderChange = (minValue: number, maxValue: number) => {
    urlParamHandler.addOrUpdateParam(
      FilterURLParams.PRICE,
      [minValue + "", maxValue + ""],
      true
    );
    searchParams.set(ShopURLParams.FILTERS, urlParamHandler.encodeParams());
    router.push(pathname + "?" + searchParams);
  };

  const GetNearestThousandPrice = (price: number) => {
    return Math.ceil(price / 1000) * 1000;
  };

  const minPrice = defaultPriceFilter ? parseFloat(defaultPriceFilter[0]) : 0;

  const maxPrice = defaultPriceFilter
    ? parseFloat(defaultPriceFilter[1])
    : GetNearestThousandPrice(props.maxPrice);

  return (
    <AccordionItem value="Price">
      <AccordionTrigger className="font-semibold">Price</AccordionTrigger>
      <AccordionContent className="px-5 mt-2">
        <TwoSidedSlider
          step={1}
          className="[&>span>span:first-child]:bg-gray-200 [&>span>_*_span]:bg-default [&>span>_*_span]:border-default"
          min={0}
          max={GetNearestThousandPrice(props.maxPrice)}
          getMinText={(value) => `Min: $${value.toFixed(2)}`}
          getMaxText={(value) => `Max: $${value.toFixed(2)}`}
          defaultMinValue={minPrice}
          defaultMaxValue={maxPrice}
          onSliderChange={onSliderChange}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
