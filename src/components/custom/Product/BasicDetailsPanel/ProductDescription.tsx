import React, { FC } from "react";

const ProductDescription: FC<{ description: string }> = ({ description }) => (
  <p className="text-justify text-sm">{description}</p>
);

export default ProductDescription;
