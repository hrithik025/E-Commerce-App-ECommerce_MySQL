"use server";

import { GetUserId } from "@/server/entities/actions";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { prisma } from "@/server/lib/prisma";
import { Repository } from "@/server/lib/Repository";
import { GetProductsForBrowseQueryResultSchema } from "@/server/schemas/Product.schema";

export async function GetProductsForBrowse(WhereFn?: (item: GetProductsForBrowseQueryResultSchema) => boolean, sortBy?: string) {
    const userId = await GetUserId();

    if (userId !== null) {
        const result = await prisma.$queryRaw`CALL GetProductsForBrowse(${userId},${sortBy ?? null});` as any[];
        const products = Repository.MapProcedureResult<GetProductsForBrowseQueryResultSchema>(result, ['ProductId', 'ProductVariantId', 'ProductName', 'ProductLabel', 'ProductCategoryName', 'ProductVariantName', 'OriginalPrice', 'Discount', 'NewPrice', 'NoOfStars', 'NoOfReviews', 'IsWishlisted']);
        const serializedProducts = JSONExtension.Serialize(products) as GetProductsForBrowseQueryResultSchema[];
        if (WhereFn) {
            return serializedProducts.filter(WhereFn);
        }
        return serializedProducts;
    }
    return [];
}