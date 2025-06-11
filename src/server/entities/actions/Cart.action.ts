"use server";

import { CreateCartProduct, UpdateCartProduct } from "@/server/entities/actions/CartProduct.action";
import { GetUserId } from "@/server/entities/actions/User.action";
import { GetAddressId } from "@/server/entities/queries/Address.query";
import { GetCartProduct } from "@/server/entities/queries/CartProduct.query";
import { GetCouponByCouponCode } from "@/server/entities/queries/Coupon.query";
import { prisma } from "@/server/lib/prisma";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { Cart, Order } from "@prisma/client";

export async function AddCartProduct(cart: Cart, productVariantId: bigint, quantity: number) {
    let cartProduct = await GetCartProduct(cart, productVariantId);
    if (cartProduct === null) {
        cartProduct = await CreateCartProduct(cart, productVariantId, quantity);
    } else if (!cartProduct.IsActive) {
        await UpdateCartProduct(cartProduct, quantity);
    }
}

export async function CreateCart(userId: bigint) {
    let cart = await Repository.Carts.create({
        data: {
            UserId: userId
        }
    });
    return cart;
}

export async function PlaceOrder(encryptedAddressId: string, couponCode: string | null): Promise<ServerActionAPIResultSchema<null>> {
    try {
        const userId = await GetUserId();
        const addressId = await GetAddressId(encryptedAddressId);
        const coupon = await GetCouponByCouponCode(couponCode);

        if (userId !== null && addressId !== null) {
            await prisma.$queryRaw`CALL CreateOrder(${userId}, ${addressId}, ${coupon?.Id});`;
            return { data: null, success: true, error: null }
        }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
    return { data: null, success: false, error: null }
}