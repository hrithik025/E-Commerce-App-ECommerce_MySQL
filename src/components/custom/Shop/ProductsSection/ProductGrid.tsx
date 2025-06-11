"use server";
import { ProductCard } from "@/components/ui";
import { FC } from "react";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas/Product.schema";

interface ProductGridProps extends BaseProps {
  Products: GetProductsForBrowseQueryResultSchema[];
}

export const ProductGrid: FC<ProductGridProps> = async (props) => {
  return (
    <div className="grid grid-cols-4 gap-5 px-2 pt-3 pb-5">
      {props.Products.map((product, idx) => (
        <ProductCard
          key={idx}
          link={`/product/${product.ProductVariantId}`}
          name={product.ProductLabel}
          originalPrice={product.OriginalPrice}
          latestPrice={product.NewPrice}
          rating={product.NoOfStars}
          isWishlisted={product.IsWishlisted}
          discount={product.Discount}
          imageHeight={250}
          productData={product}
        />
      ))}
    </div>
  );
};
