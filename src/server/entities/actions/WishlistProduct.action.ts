"use server";

import { GetWishlistProductId } from "@/server/entities/queries/WishlistProduct.query";
import { prisma } from "@/server/lib/prisma";
import { Wishlist, WishlistProduct } from "@prisma/client";

export async function CreateWishlistProduct(wishlist: Wishlist, productVariantId: bigint) {
    let wishlistProduct = await prisma.wishlistProduct.create({
        data: {
            WishlistId: wishlist.Id,
            ProductVariantId: productVariantId,
            AddedDate: new Date(),
            IsActive: true
        }
    })
    return wishlistProduct;
}

export async function UpdateWishlistProduct(wishlistProduct: WishlistProduct, isActive: boolean) {
    await UpdateWishlistProductById(wishlistProduct.Id, isActive);
}

export async function UpdateWishlistProductById(wishlistProductId: bigint, isActive: boolean) {
    await prisma.wishlistProduct.update({
        data: {
            IsActive: isActive
        },
        where: {
            Id: wishlistProductId
        }
    });
}

export async function UpdateWishlistProductByEncryptedId(encryptedId: string, isActive: boolean) {
    const wishlistProductId = await GetWishlistProductId(encryptedId);
    await prisma.wishlistProduct.update({
        data: {
            IsActive: isActive
        },
        where: {
            Id: wishlistProductId
        }
    });
}