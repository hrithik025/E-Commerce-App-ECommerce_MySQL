"use server";

import { GetUserId } from "@/server/entities/actions";
import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { prisma } from "@/server/lib/prisma";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetProductVariantsForWishlistSchema } from "@/server/types/WishlistProduct.type";
import { Wishlist } from "@prisma/client";

export async function GetWishlistProduct(wishlist: Wishlist, productVariantId: bigint) {
    const wishlistProduct = await Repository.WishlistProducts.findFirst({
        where: {
            AND: {
                ProductVariantId: productVariantId,
                WishlistId: wishlist.Id
            }
        }
    });
    return wishlistProduct;
}

export async function GetProductVariantsForWishlist(): Promise<ServerActionAPIResultSchema<GetProductVariantsForWishlistSchema[]>> {
    try {
        const userId = await GetUserId();
        if (userId !== null) {
            const result = await prisma.$queryRaw`CALL GetProductVariantsForWishlist(${userId});` as any[];
            const productVariantsForWishlist = Repository.MapProcedureResult<GetProductVariantsForWishlistSchema>(result, ['ProductId', 'ProductVariantId', 'WishlistProductId', 'ProductName', 'ProductLabel', 'ProductCategoryName', 'ProductCategoryLabel', 'ProductVariantName', 'OriginalPrice', 'Quantity', 'Discount', 'LatestPrice', 'VariantCategoryName', 'VariantCategoryLabel', 'VariantCategoryValueName', 'VariantCategoryValueLabel', 'ProductImageId']);
            const data = JSONExtension.Serialize(productVariantsForWishlist) as GetProductVariantsForWishlistSchema[]
            if (Array.isArray(data) && data.length > 0) {
                return { data: data, success: true, error: null };
            }
        }
        return { data: [], success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetWishlistProductId(encryptedValue: string): Promise<bigint> {
    const decryptedValue = await CryptoHelper.GetDecryptedValue(encryptedValue);
    return decryptedValue;
}