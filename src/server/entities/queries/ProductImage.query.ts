"use server";

import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetProductVariantImageDataSchema } from "@/server/types/ProductImage.type";
import path from "path";
import fs from "fs";

export async function GetProductImageId(encryptedValue: string): Promise<bigint> {
    const decryptedValue = await CryptoHelper.GetDecryptedValue(encryptedValue);
    return decryptedValue;
}

export async function GetProductImagePath(ProductImageId: bigint) {
    const productImageDetail = await Repository.ProductImages.findFirstOrThrow({
        where: {
            Id: ProductImageId
        },
        include: {
            FileStore: true
        }
    });

    return { path: path.join(productImageDetail.FileStore.FileStoragePath, productImageDetail.FileName + "." + productImageDetail.FileExtension), mimetype: `image/${productImageDetail.FileExtension}` };
}

export async function GetProductVariantImageData(encryptedProductImageId: string): Promise<ServerActionAPIResultSchema<GetProductVariantImageDataSchema>> {
    try {
        const productImageId = await GetProductImageId(encryptedProductImageId);
        const productImagePath = await GetProductImagePath(productImageId);
        const imageBuffer = await fs.promises.readFile(productImagePath.path);
        console.log(productImagePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = productImagePath.mimetype; // Change based on your file

        const dataUrl: GetProductVariantImageDataSchema = {
            Data: `data:${mimeType};base64,${base64Image}`
        }

        return { data: dataUrl, success: true, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}