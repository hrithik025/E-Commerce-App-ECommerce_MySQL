import React, { FC } from "react";
import { Rating } from "@/components/ui";

const ProductRating: FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-2">
    <span className="font-semibold">({rating.toFixed(2)})</span>
    <Rating rating={rating} />
  </div>
);

export default ProductRating;
