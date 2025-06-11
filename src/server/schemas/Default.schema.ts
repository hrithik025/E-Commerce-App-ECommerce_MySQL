import { GetProductVariantImageDataSchema } from "@/server/types/ProductImage.type";

export type ServerActionAPIResultSchema<T> = {
    data: T | null,
    error: unknown,
    success: boolean
}


interface ImageDataSchema {
    [key: string]: GetProductVariantImageDataSchema | null;
}