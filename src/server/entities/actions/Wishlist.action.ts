"use server";

import { CreateWishlistProduct, UpdateWishlistProduct } from "@/server/entities/actions/WishlistProduct.action";
import { GetWishlistProduct } from "@/server/entities/queries/WishlistProduct.query";
import { prisma } from "@/server/lib/prisma";
import { Wishlist } from "@prisma/client";

export async function AddWishlistProduct(wishlist: Wishlist, productVariantId: bigint) {
    let wishlistProduct = await GetWishlistProduct(wishlist, productVariantId);
    if (wishlistProduct === null) {
        wishlistProduct = await CreateWishlistProduct(wishlist, productVariantId);
    } else if (!wishlistProduct.IsActive) {
        await UpdateWishlistProduct(wishlistProduct, true)
    }
}

export async function CreateWishlist(userId: bigint) {
    let wishlist = await prisma.wishlist.create({
        data: {
            UserId: userId
        }
    });
    return wishlist;
}