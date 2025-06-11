import React from "react";
// region Images import
import { ProductCard } from "@/components/ui";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas";
import { GetProductsForBrowse } from "@/server/entities/queries/Product.query";
// endregion

export const BestProductSection = async () => {
  const products: GetProductsForBrowseQueryResultSchema[] = (
    await GetProductsForBrowse()
  ).slice(0, 12);

  return (
    <div className="py-5 mb-5 mt-2 grid grid-cols-4 place-items-center gap-5">
      <div className="col-span-full">
        <span className="font-semibold text-3xl italic text-center">
          Our Best Products
        </span>
      </div>
      {products.map((product, idx) => (
        <ProductCard
          key={idx}
          link={`/product/${product.ProductVariantId}`}
          name={product.ProductLabel}
          originalPrice={product.OriginalPrice}
          latestPrice={product.NewPrice}
          rating={product.NoOfStars}
          isWishlisted={product.IsWishlisted}
          discount={product.Discount}
          imageHeight={450}
          productData={product}
        />
      ))}
    </div>
  );
};
