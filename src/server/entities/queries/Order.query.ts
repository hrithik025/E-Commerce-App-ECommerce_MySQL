"use server";

import { GetUserId } from "@/server/entities/actions";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { prisma } from "@/server/lib/prisma";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { YourOrdersSchema } from "@/server/types/Order.type";

export async function GetOrdersByUserId(): Promise<ServerActionAPIResultSchema<YourOrdersSchema[]>> {
    try {
        const userId = await GetUserId();
        if (userId !== null) {
            const orderProducts = await prisma.$queryRaw`
                SELECT
                    OrderProducts.Id,
                    OrderProducts.ProductVariantId,
                    OrderProducts.RandomId AS OrderNumber,
					OrderProducts.Price Amount,
					OrderProducts.Status,
                    Addresses.Email,
                    OrderProducts.Quantity,
					CONCAT(Products.Label, ' (', ProductVariants.Label, ')') ProductName,
					OrderProducts.OrderDate
                FROM
                    OrderProducts
                    JOIN Orders
                        ON OrderProducts.OrderId = Orders.Id
                        AND Orders.UserId = 1
					JOIN ProductVariants
						ON OrderProducts.ProductVariantId = ProductVariants.Id
                    JOIN Products
                        ON Products.Id = ProductVariants.ProductId
                    JOIN Addresses
                        ON OrderProducts.AddressId = Addresses.Id
                WHERE
                    Orders.UserId = ${userId}
                ORDER BY
                    OrderProducts.Id DESC

            `;
            const serializedProducts = JSONExtension.Serialize(orderProducts) as YourOrdersSchema[];
            if (Array.isArray(serializedProducts)) {
                return { data: serializedProducts, error: null, success: true }
            }
        }

    } catch (error) {
        return { data: null, error: error, success: false }
    }
    return { data: null, error: null, success: false }
}