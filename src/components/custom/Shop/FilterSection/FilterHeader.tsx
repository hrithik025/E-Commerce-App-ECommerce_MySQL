"use client";

import { FilterURLParams, ShopURLParams } from "@/app/shop/page";
import BaseProps from "@/lib/Props/BaseProps";
import URLParamHandler from "@/lib/URLParamHandler";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface FilterHeaderProps extends BaseProps {}

export const FilterHeader: FC<FilterHeaderProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const [searchFilter, setSearchFilter] = useState<string>("");

  const urlParamHandler = new URLParamHandler(
    searchParams.get(ShopURLParams.FILTERS)?.toString()
  );

  const urlSearchFilter: string =
    (urlParamHandler.getParam(FilterURLParams.SEARCH) as string) ?? "";

  const onSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    urlParamHandler.addOrUpdateParam(FilterURLParams.SEARCH, value);
    searchParams.set(ShopURLParams.FILTERS, urlParamHandler.encodeParams());
    router.push(pathname + "?" + searchParams);
  };

  useEffect(() => {
    setSearchFilter(urlSearchFilter);
  }, [urlSearchFilter]);

  return (
    <div
      className={classNames(
        "bg-gray-200/80 rounded-xl flex items-center justify-center px-4 py-2 gap-2 font-semibold",
        props.className
      )}
    >
      <input
        className="text-sm placeholder:text-sm w-full focus:outline-0"
        type="text"
        placeholder="Search Products..."
        onChange={onSearchFilterChange}
        value={searchFilter}
      />
      <BsSearch className="cursor-pointer text-gray-600" size={20} />
    </div>
  );
};
