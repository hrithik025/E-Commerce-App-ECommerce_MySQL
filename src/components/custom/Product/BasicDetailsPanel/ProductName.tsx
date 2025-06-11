import React, { FC } from "react";

const ProductName: FC<{ name: string }> = ({ name }) => (
  <span className="text-2xl font-semibold">{name}</span>
);

export default ProductName;
