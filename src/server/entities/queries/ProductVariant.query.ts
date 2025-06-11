"use server";

import { GetUserId } from "@/server/entities/actions";
import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { prisma } from "@/server/lib/prisma";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetProductVariantCategoriesSchema, GetProductVariantDetailSchema, GetProductVariantImageSchema } from "@/server/types/ProductVariant.type";

export async function GetProductVariantId(encryptedValue: string): Promise<bigint> {
    const decryptedValue = await CryptoHelper.GetDecryptedValue(encryptedValue);
    return decryptedValue;
}

function ComputeLatestPrice(price: number, discount: number) {
    return price - (discount / 100 * price);
}

export async function GetProductVariantDetails(encryptedProductVariantId: string): Promise<ServerActionAPIResultSchema<GetProductVariantDetailSchema>> {
    try {
        const userId = await GetUserId();
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        const productVariantDetails = await prisma.$queryRaw`CALL GetProductVariantDetails(${userId},${productVariantId});` as any[];
        const productVariants = Repository.MapProcedureResult<GetProductVariantDetailSchema>(productVariantDetails, ['ProductId', 'ProductVariantId', 'ProductName', 'ProductLabel', 'ProductCategoryName', 'ProductCategoryLabel', 'ProductVariantName', 'OriginalPrice', 'Quantity', 'Discount', 'LatestPrice', 'NoOfStars', 'NoOfReviews', 'VariantCategoryName', 'VariantCategoryLabel', 'VariantCategoryValueName', 'VariantCategoryValueLabel', 'IsPresentInCart', 'IsWishlisted', 'Description']);
        let data = JSONExtension.Serialize(productVariants) as GetProductVariantDetailSchema[];
        if (Array.isArray(data) && data.length > 0) {
            return { data: data[0], success: true, error: null }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetProductVariantCategories(encryptedProductVariantId: string): Promise<ServerActionAPIResultSchema<GetProductVariantCategoriesSchema[]>> {
    try {
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        const result = await prisma.$queryRaw`CALL GetProductVariantCategories(${productVariantId});` as any[];
        const productVariantCategories = Repository.MapProcedureResult<GetProductVariantCategoriesSchema>(result, ['ProductVariantId', 'VariantCategoryConfigId', 'VariantCategoryName', 'VariantCategoryLabel', 'VariantCategoryValueName', 'VariantCategoryValueLabel', 'IsSelected']);
        let data = JSONExtension.Serialize(productVariantCategories) as GetProductVariantCategoriesSchema[];
        if (Array.isArray(data) && data.length > 0) {
            return { data: data, success: true, error: null }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetCurrentQuantity(encryptedProductVariantId: string): Promise<ServerActionAPIResultSchema<number>> {
    try {
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        const productVariant = await Repository.ProductVariants.findFirst({
            where: {
                Id: productVariantId
            }, select: {
                Quantity: true
            }
        });
        if (productVariant !== null) {
            return { data: productVariant.Quantity, success: true, error: null }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetProductVariantImages(encryptedProductVariantId: string): Promise<ServerActionAPIResultSchema<GetProductVariantImageSchema[]>> {
    try {
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        const productImages = await Repository.ProductImages.findMany({
            where: {
                ProductVariantId: productVariantId
            }, select: {
                Id: true
            }
        });

        const data = JSONExtension.Serialize(productImages) as GetProductVariantImageSchema[];

        if (productImages !== null) {
            return { data: data, success: true, error: null }
        }
        return { data: [], success: false, error: null }
    } catch (error) {
        return { data: [], success: false, error: error }
    }
}

export async function GetProductVariantImagesForCards(encryptedProductVariantId: string, noOfImages: number): Promise<ServerActionAPIResultSchema<GetProductVariantImageSchema[]>> {
    try {
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        const productImages = await Repository.ProductImages.findMany({
            where: {
                ProductVariantId: productVariantId
            }, select: {
                Id: true
            }, take: noOfImages
        });
        
        const data = JSONExtension.Serialize(productImages) as GetProductVariantImageSchema[];

        if (productImages !== null) {
            return { data: data, success: true, error: null }
        }
        return { data: [], success: false, error: null }
    } catch (error) {
        return { data: [], success: false, error: error }
    }
}