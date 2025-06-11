import { WishlistButton } from "@/components/ui/custom/wishlistButton";
import React, { FC } from "react";

const ProductPrice: FC<{
  discount: number;
  originalPrice?: number;
  latestPrice: number;
  isWishlisted: boolean;
  ProductVariantId: string;
}> = (props) => (
  <div className="relative flex gap-4 py-4">
    {props.discount > 0 && (
      <span className="bg-green-700 text-white px-3 py-1 rounded-2xl font-semibold">
        {props.discount}%
      </span>
    )}
    {props.originalPrice && props.discount > 0 && (
      <span className="text-gray-500 line-through text-2xl">
        ${props.originalPrice.toFixed(2)}
      </span>
    )}
    <span className="font-semibold text-2xl">
      ${props.latestPrice.toFixed(2)}
    </span>
    <div className="absolute bottom-0 right-0 z-10">
      <WishlistButton
        isWishlisted={props.isWishlisted}
        productVariantId={props.ProductVariantId}
      />
    </div>
  </div>
);

export default ProductPrice;
