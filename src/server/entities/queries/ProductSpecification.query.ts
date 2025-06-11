"use server";

import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetProductSpecificationSchema } from "@/server/types/ProductSpecification.type";
import { GetProductVariantId } from "@/server/entities/queries/ProductVariant.query";
import { Repository } from "@/server/lib/Repository";

export async function GetProductSpecifications(encryptedProductVariantId: string): Promise<ServerActionAPIResultSchema<GetProductSpecificationSchema[]>> {
    try {
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        const specifications = await Repository.ProductSpecifications.findMany({
            where: {
                ProductVariantId: productVariantId
            }, select: {
                Key: true,
                Value: true
            }
        });

        return { data: specifications, success: true, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}