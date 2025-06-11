"use server";

import { GetUserId } from "@/server/entities/actions/User.action";
import { GetProductVariantId } from "@/server/entities/queries/ProductVariant.query";
import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { UserReviewFormData } from "@/server/types/Review.type";

export async function GetReviewId(encryptedValue: string): Promise<bigint> {
    const decryptedValue = await CryptoHelper.GetDecryptedValue(encryptedValue);
    return decryptedValue;
}

export async function CreateReview(encryptedProductVariantId: string, review: UserReviewFormData): Promise<ServerActionAPIResultSchema<boolean>> {
    try {
        const userId = await GetUserId();
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        if (userId !== null && productVariantId !== null) {
            let result = await Repository.Reviews.create({
                data: {
                    UserId: userId,
                    Comment: review.Comment,
                    NoOfStars: parseFloat(review.NoOfStars).toFixed(2),
                    PostedDate: new Date(),
                    ProductVariantId: productVariantId
                }
            });
            return { data: true, success: true, error: null };
        }
        return { data: false, success: false, error: null };
    } catch (error) {
        return { data: false, success: false, error: error };
    }
}

export async function EditReview(encryptedProductVariantId: string, encryptedReviewId: string, review: UserReviewFormData): Promise<ServerActionAPIResultSchema<boolean>> {
    try {
        const userId = await GetUserId();
        const productVariantId = await GetProductVariantId(encryptedProductVariantId);
        const reviewId = await GetReviewId(encryptedReviewId);

        if (userId !== null && productVariantId !== null && reviewId !== null) {
            let result = await Repository.Reviews.update({
                where: {
                    Id: reviewId
                },
                data: {
                    Comment: review.Comment,
                    NoOfStars: parseFloat(review.NoOfStars).toFixed(2),
                }
            });
            return { data: true, success: true, error: null };
        }
        return { data: false, success: false, error: null };
    } catch (error) {
        return { data: false, success: false, error: error };
    }
}