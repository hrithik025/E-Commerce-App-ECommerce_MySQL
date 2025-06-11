"use client";
import { ShopURLParams, FilterURLParams } from "@/app/shop/page";
import { AccordionItem, AccordionTrigger, Checkbox } from "@/components/ui";
import URLParamHandler from "@/lib/URLParamHandler";
import { AccordionContent, Item } from "@radix-ui/react-accordion";
import { CheckedState } from "@radix-ui/react-checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type ProductCategorySchema = {
  Name: string;
  Label: string;
};

export const FilterByCategory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const [productCategories, setProductCategories] = useState<
    ProductCategorySchema[]
  >([]);
  const selectedProductCategories: Set<string> = new Set();

  useEffect(() => {
    LoadProductCategories();
  }, [pathname]);

  const urlParamHandler = new URLParamHandler(
    searchParams.get(ShopURLParams.FILTERS)?.toString()
  );

  const defaultCategoryFilter: string[] | undefined =
    (urlParamHandler.getParam(FilterURLParams.CATEGORIES) as string[]) ?? [];

  defaultCategoryFilter.forEach((category, idx) => {
    selectedProductCategories.add(category);
  });

  const LoadProductCategories = () => {
    try {
      fetch("/api/productCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((response) => {
          setProductCategories(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const updateFilters = () => {
    urlParamHandler.addOrUpdateParam(
      FilterURLParams.CATEGORIES,
      [...selectedProductCategories],
      true
    );
    searchParams.set(ShopURLParams.FILTERS, urlParamHandler.encodeParams());
    router.push(pathname + "?" + searchParams);
  };

  const onCheckedChange = (
    checked: CheckedState,
    category: ProductCategorySchema
  ) => {
    if (checked) {
      selectedProductCategories.add(category.Name);
    } else {
      selectedProductCategories.delete(category.Name);
    }
    updateFilters();
  };

  return (
    <AccordionItem value="Category">
      <AccordionTrigger className="font-semibold">Category</AccordionTrigger>
      <AccordionContent
        id="category"
        className="px-5 mt-2 flex flex-col space-y-2"
      >
        {productCategories.map((productCategory, idx) => (
          <div className="flex items-center" key={idx}>
            <Checkbox
              id={productCategory.Label}
              value={productCategory.Name}
              onCheckedChange={(checked: CheckedState) =>
                onCheckedChange(checked, productCategory)
              }
              checked={selectedProductCategories.has(productCategory.Name)}
              className="data-[state=checked]:bg-default border-gray-400 data-[state=checked]:border-default mr-2"
            />
            <label
              htmlFor={productCategory.Label}
              className="hover:cursor-pointer"
            >
              {productCategory.Label}
            </label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
