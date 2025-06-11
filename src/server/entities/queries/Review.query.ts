"use server";

import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetProductVariantId } from "@/server/entities/queries/ProductVariant.query";
import { Repository } from "@/server/lib/Repository";
import { GetReviewForUserSchema, GetReviewSchema, UserReviewSchema } from "@/server/types/Review.type";
import { GetUserId } from "@/server/entities/actions";
import { prisma } from "@/server/lib/prisma";
import { OrderProduct } from "@prisma/client";
import { JSONExtension } from "@/server/lib/JSONExtension";

export async function GetProductReviews(encryptedProductVariantId: string): Promise<ServerActionAPIResultSchema<GetReviewSchema[]>> {
    try {
        const userId = await GetUserId();
        if (userId !== null) {
            const productVariantId = await GetProductVariantId(encryptedProductVariantId);
            const reviews = await Repository.Reviews.findMany({
                where: {
                    ProductVariantId: productVariantId
                }, select: {
                    User: {
                        select: {
                            FirstName: true,
                            LastName: true,
                        }
                    },
                    NoOfStars: true,
                    Comment: true
                }
            });

            const data: GetReviewSchema[] = [];
            reviews.forEach(review => {
                data.push({
                    UserName: review.User.FirstName + " " + review.User.LastName,
                    NoOfStars: review.NoOfStars.toNumber(),
                    Comment: review.Comment
                })
            });

            return { data: data, success: true, error: null }
        }
        return { data: [], success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}


export async function GetProductReviewForUser(encryptedProductVariantId: string): Promise<ServerActionAPIResultSchema<GetReviewForUserSchema>> {
    try {
        const userId = await GetUserId();
        if (userId !== null) {
            const productVariantId = await GetProductVariantId(encryptedProductVariantId);
            const createReviewResult: OrderProduct[] = await prisma.$queryRaw`
                SELECT
                    OrderProducts.*
                FROM
                    OrderProducts
                    JOIN Orders
                        ON OrderProducts.OrderId = Orders.Id
                        AND OrderProducts.ProductVariantId = ${productVariantId}
                WHERE
                    Orders.UserId = ${userId}
            `;


            const editReviewResult = await Repository.Reviews.findFirst({
                where: {
                    ProductVariantId: productVariantId,
                    UserId: userId
                }, select: {
                    Id: true,
                    NoOfStars: true,
                    Comment: true
                }
            });

            const editReviewResultSerialized = editReviewResult !== null ? JSONExtension.Serialize(editReviewResult) as UserReviewSchema : null;

            const result: GetReviewForUserSchema = {
                IsCreateApplicable: createReviewResult !== null && createReviewResult.length > 0 && editReviewResultSerialized === null,
                IsEditApplicable: editReviewResultSerialized !== null,
                Review: editReviewResultSerialized !== null ? {
                    Id: editReviewResultSerialized.Id,
                    Comment: editReviewResultSerialized.Comment,
                    NoOfStars: editReviewResultSerialized.NoOfStars.toString()
                } : null
            };

            return { data: result, success: true, error: null }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}