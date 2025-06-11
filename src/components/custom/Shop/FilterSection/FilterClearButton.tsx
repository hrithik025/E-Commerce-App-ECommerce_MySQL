"use client";
import { Button } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const FilterClearButton = () => {
  const pathName = usePathname();
  const router = useRouter();

  const clearFilters = (event: React.MouseEvent<HTMLButtonElement>) => {
    router.push(pathName);
  };

  return (
    <Button
      className="hover:bg-default font-semibold hover:cursor-pointer w-full"
      onClick={clearFilters}
    >
      Clear
    </Button>
  );
};
