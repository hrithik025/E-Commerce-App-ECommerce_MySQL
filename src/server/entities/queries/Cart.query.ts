"use server";

import { Repository } from "@/server/lib/Repository";

export async function GetCart(userId: bigint) {
    const wishlist = await Repository.Carts.findFirst({
        where: {
            UserId: userId
        }
    });
    return wishlist;
}