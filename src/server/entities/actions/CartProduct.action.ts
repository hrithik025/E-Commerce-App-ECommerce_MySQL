"use server";

import { Repository } from "@/server/lib/Repository";
import { Cart, CartProduct } from "@prisma/client";

export async function CreateCartProduct(cart: Cart, productVariantId: bigint, quantity: number) {
    let cartProduct = await Repository.CartProducts.create({
        data: {
            CartId: cart.Id,
            ProductVariantId: productVariantId,
            IsActive: true,
            Quantity: quantity,
            AddedDate: new Date()
        }
    });
    return cartProduct;
}

export async function UpdateCartProduct(cartProduct: CartProduct, quantity: number) {
    console.log(cartProduct)
    await Repository.CartProducts.update({
        data: {
            Quantity: quantity,
            IsActive: quantity > 0
        },
        where: {
            Id: cartProduct.Id
        }
    });
}