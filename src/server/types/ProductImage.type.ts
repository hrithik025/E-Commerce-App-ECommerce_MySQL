export type GetProductVariantImageDataSchema = {
    Data: string;
}

export type ImageDataSchema = {
    [key: string]: GetProductVariantImageDataSchema | null;
}