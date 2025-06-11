"use client";

import { ClientCarousel } from "./ClientCarousel";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductVariantImageSchema } from "@/server/types";
import classNames from "classnames";
import React, { FC, useState } from "react";

interface ImagePanelProps extends BaseProps {
  images: GetProductVariantImageSchema[];
}

export const ImagePanel: FC<ImagePanelProps> = (props) => {
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);

  return (
    <div
      className={classNames(
        "grid grid-cols-12 gap-5 h-[600px] px-5 py-5 sticky top-0",
        props.className
      )}
    >
      <ClientCarousel
        images={props.images}
        currentImageIdx={currentImageIdx}
        setCurrentImageIdx={setCurrentImageIdx}
      />
    </div>
  );
};
