import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import classNames from "classnames";
import { ProductProps } from "@/lib/Props/ProductProps";
import { Rating } from "@/components/ui";
import { WishlistButton } from "@/components/ui/custom/wishlistButton";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas/Product.schema";
import { GetProductVariantImageSchema } from "@/server/types";
import { GetProductVariantImageDataSchema } from "@/server/types/ProductImage.type";
import { GetProductVariantImageData } from "@/server/entities/queries/ProductImage.query";
import { GetProductVariantImagesForCards } from "@/server/entities/queries/ProductVariant.query";

interface ProductCardProps extends ProductProps {
  link: string;
  imageHeight: number;
  showRating?: boolean;
  showPrices?: boolean;
  showWishlistButton?: boolean;
  productData: GetProductsForBrowseQueryResultSchema;
}

export const ProductCard: FC<ProductCardProps> = async (props) => {
  let defaultedProps = {
    discount: props.discount ?? 0,
    isOutOfStock: props.isOutOfStock ?? false,
    isWishlisted: props.isWishlisted ?? false,
    showRating: props.showRating ?? true,
    showPrices: props.showPrices ?? true,
    showWishlistButton: props.showWishlistButton ?? true,
    ...props,
  };

  const imageResult = await GetProductVariantImagesForCards(
    props.productData.ProductVariantId,
    2
  );
  const images = imageResult.data;

  var image: GetProductVariantImageDataSchema | any = null;
  var hoverImage: GetProductVariantImageDataSchema | any = null;

  const isHoverImagePresent = () => {
    return images !== null && images.length > 1;
  };

  const loadImages = async () => {
    if (images !== null && images.length !== 0) {
      const imageResult = await GetProductVariantImageData(images[0].Id);
      
      if (imageResult.success && imageResult.data !== null) {
        image = imageResult.data;
        if (isHoverImagePresent()) {
          const hoverImageResult = await GetProductVariantImageData(
            images[1].Id
          );
          if (hoverImageResult.success && hoverImageResult.data !== null) {
            hoverImage = hoverImageResult.data;
          }
        }
      }
    }
  };

  await loadImages();

  return (
    <div
      className={classNames(
        "rounded-sm overflow-hidden shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.25)] [&>*]:transition [&>*]:duration-300 hover:scale-105 transition duration-200",
        defaultedProps.className
      )}
      style={
        { "--image-height": `${props.imageHeight}px` } as React.CSSProperties
      }
    >
      <div className="relative">
        <Link href={defaultedProps.link} className="h-4/6">
          {image !== null && (
            <img
              src={image.Data}
              alt="Product-Image"
              className={classNames({
                "w-full object-contain -z-50 peer opacity-100 h-[var(--image-height)]":
                  true,
                "hover:opacity-0": isHoverImagePresent(),
              })}
            />
          )}
          {isHoverImagePresent() && hoverImage !== null && (
            <img
              src={hoverImage.Data}
              alt="Product-Image"
              className="absolute top-0 w-full object-contain -z-50 peer-hover:opacity-100 opacity-0 h-[var(--image-height)]"
            />
          )}
        </Link>
        <div className="absolute top-0 left-0 w-full z-10 text-lg font-semibold">
          {!defaultedProps.isOutOfStock && defaultedProps.discount > 0 && (
            <span className="px-3 py-1.5 bg-default text-white rounded-br-sm inline-block">
              {defaultedProps.discount}&nbsp;%
            </span>
          )}
          {defaultedProps.isOutOfStock && (
            <span className="px-3 py-1.5 bg-gray-500 text-white rounded-br-sm  inline-block">
              Out of stock
            </span>
          )}
        </div>
        {defaultedProps.showWishlistButton && (
          <div className="absolute bottom-0 right-0 z-10">
            <WishlistButton
              isWishlisted={defaultedProps.isWishlisted}
              productVariantId={props.productData.ProductVariantId}
            />
          </div>
        )}
      </div>
      <Link
        href={defaultedProps.link}
        className="py-2 mb-2 pb-4 font-semibold flex flex-col items-center justify-evenly gap-1 h-2/6"
      >
        <span className="text-lg text-center">{defaultedProps.name}</span>
        {defaultedProps.showRating && (
          <Rating rating={props.rating !== 0 ? props.rating : 5} />
        )}
        {defaultedProps.showPrices && (
          <div className="flex gap-3">
            {defaultedProps.discount > 0 && (
              <span className="text-gray-500 line-through">
                ${props.originalPrice.toFixed(2)}
              </span>
            )}
            <span>${defaultedProps.latestPrice.toFixed(2)}</span>
          </div>
        )}
      </Link>
    </div>
  );
};
