"use server";

import { Repository } from "@/server/lib/Repository";

export async function GetWishlist(userId: bigint) {
    const wishlist = await Repository.Wishlists.findFirst({
        where: {
            UserId: userId
        }
    });
    return wishlist;
}