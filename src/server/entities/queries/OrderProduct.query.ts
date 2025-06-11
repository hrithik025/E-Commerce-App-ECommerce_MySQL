"use server";

import { JSONExtension } from "@/server/lib/JSONExtension";
import { prisma } from "@/server/lib/prisma";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { TrackOrderSchema } from "@/server/types/OrderProduct.type";

export async function TrackOrder(orderNumber: string, email: string): Promise<ServerActionAPIResultSchema<TrackOrderSchema>> {
    try {
        const orderProducts = await prisma.$queryRaw`
                SELECT
                    OrderProducts.Id,
                    OrderProducts.ProductVariantId,
                    OrderProducts.RandomId AS OrderNumber,
					OrderProducts.Price Amount,
					OrderProducts.Status,
                    OrderProducts.Quantity,
					OrderProducts.OrderDate
                FROM
                    OrderProducts
                    JOIN Addresses
                        ON OrderProducts.AddressId = Addresses.Id
                WHERE
                    OrderProducts.RandomId = ${orderNumber} AND
                    Addresses.Email = ${email};
            `;
        const serializedProducts = JSONExtension.Serialize(orderProducts) as TrackOrderSchema[];
        if (Array.isArray(serializedProducts) && serializedProducts.length > 0) {
            return { data: serializedProducts[0], error: null, success: true }
        }

    } catch (error) {
        return { data: null, error: error, success: false }
    }
    return { data: null, error: null, success: false }
}