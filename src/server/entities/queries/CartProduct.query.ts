"use server";

import { GetUserId } from "@/server/entities/actions";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { prisma } from "@/server/lib/prisma";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetProductVariantsForCartSchema } from "@/server/types/CartProduct.type";
import { Cart } from "@prisma/client";

export async function GetCartProduct(cart: Cart, productVariantId: bigint) {
    const cartProduct = await Repository.CartProducts.findFirst({
        where: {
            AND: {
                ProductVariantId: productVariantId,
                CartId: cart.Id
            }
        }
    });
    return cartProduct;
}

export async function GetProductVariantsForCart(): Promise<ServerActionAPIResultSchema<GetProductVariantsForCartSchema[]>> {
    try {
        const userId = await GetUserId();
        if (userId !== null) {
            const result = await prisma.$queryRaw`CALL GetProductVariantsForCart(${userId});` as any[];
            const productVariants = Repository.MapProcedureResult<GetProductVariantsForCartSchema>(result, ['ProductId', 'ProductVariantId', 'CartProductId', 'ProductName', 'ProductLabel', 'ProductCategoryName', 'ProductCategoryLabel', 'ProductVariantName', 'OriginalPrice', 'Quantity', 'CartProductQuantity', 'Discount', 'LatestPrice', 'VariantCategoryName', 'VariantCategoryLabel', 'VariantCategoryValueName', 'VariantCategoryValueLabel', 'ProductImageId']);
            const data = JSONExtension.Serialize(productVariants) as GetProductVariantsForCartSchema[]
            if (Array.isArray(data) && data.length > 0) {
                return { data: data, success: true, error: null };
            }
        }
        return { data: [], success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}