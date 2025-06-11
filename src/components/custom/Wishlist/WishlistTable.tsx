import {
  Button,
  CustomTableCell,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductVariantsForWishlist } from "@/server/entities/queries/WishlistProduct.query";
import { GetProductVariantsForWishlistSchema } from "@/server/types/WishlistProduct.type";
import { StaticImageData } from "next/image";
import { FC } from "react";
import { WishlistDeleteButton } from "@/components/custom/Wishlist/WishlistDeleteButton";
import { ImageDataSchema } from "@/server/types/ProductImage.type";
import { GetProductVariantImageData } from "@/server/entities/queries/ProductImage.query";
import { FaHeartCirclePlus } from "react-icons/fa6";
import Link from "next/link";

interface IProduct {
  image: StaticImageData;
  url: string;
  name: string;
  originalPrice: number;
  latestPrice: number;
  isOutOfStock: boolean;
}

interface WishlistProps extends BaseProps {
  products: IProduct[];
}

export const WishlistTable: FC<WishlistProps> = async (props) => {
  const result = await GetProductVariantsForWishlist();
  let wishlistProducts: GetProductVariantsForWishlistSchema[] = [];
  const imagesData: ImageDataSchema = {};

  if (result.success && Array.isArray(result.data)) {
    wishlistProducts = result.data;
    for (let i = 0; i < wishlistProducts.length; i++) {
      const wishlistProduct = wishlistProducts[i];
      const imageDataResult = await GetProductVariantImageData(
        wishlistProduct.ProductImageId
      );
      if (imageDataResult.success && imageDataResult.data !== null) {
        imagesData[wishlistProduct.ProductImageId] = imageDataResult.data;
      }
    }
  }

  const getURL = (product: GetProductVariantsForWishlistSchema) => {
    return `/product/${product.ProductVariantId}`;
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="h-60 flex items-center gap-5 flex-col justify-center text-gray-500">
        <FaHeartCirclePlus size={100} />
        <span className="text-xl font-semibold">
          No Items Present in the Wishlist
        </span>
        <Link href="/shop">
          <Button className="hover:cursor-pointer bg-default hover:bg-default-bright text-white font-semibold">
            Add Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="[&>th]:font-semibold">
          <TableHead>S.No</TableHead>
          <TableHead>Product Image</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wishlistProducts.map((wishlistProduct, idx) => (
          <TableRow key={idx} className="h-[150px]">
            <CustomTableCell
              className="font-semibold"
              url={getURL(wishlistProduct)}
            >
              {idx + 1}
            </CustomTableCell>
            <CustomTableCell url={getURL(wishlistProduct)}>
              <img
                src={imagesData[wishlistProduct.ProductImageId]?.Data}
                alt="Product"
                width={100}
              />
            </CustomTableCell>
            <CustomTableCell
              url={getURL(wishlistProduct)}
            >{`${wishlistProduct.ProductLabel} (${wishlistProduct.ProductVariantName})`}</CustomTableCell>
            <CustomTableCell url={getURL(wishlistProduct)}>
              {wishlistProduct.LatestPrice}
            </CustomTableCell>
            <CustomTableCell url={getURL(wishlistProduct)}>
              {wishlistProduct.Quantity > 0 ? (
                <span className="font-semibold text-green-600">In Stock</span>
              ) : (
                <span className="font-semibold text-default-bright">
                  Out of Stock
                </span>
              )}
            </CustomTableCell>
            <CustomTableCell>
              <WishlistDeleteButton
                WishlistProductId={wishlistProduct.WishlistProductId}
              />
            </CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
