"use server";
import { CreateCart } from "@/server/entities/actions/Cart.action";
import { CreateCartProduct, UpdateCartProduct } from "@/server/entities/actions/CartProduct.action";
import { GetUserId } from "@/server/entities/actions/User.action";
import { CreateWishlist } from "@/server/entities/actions/Wishlist.action";
import { CreateWishlistProduct, UpdateWishlistProduct } from "@/server/entities/actions/WishlistProduct.action";
import { GetCart } from "@/server/entities/queries/Cart.query";
import { GetCartProduct } from "@/server/entities/queries/CartProduct.query";
import { GetProductVariantId } from "@/server/entities/queries/ProductVariant.query";
import { GetWishlist } from "@/server/entities/queries/Wishlist.query";
import { GetWishlistProduct } from "@/server/entities/queries/WishlistProduct.query";
import { ServerActionAPIResultSchema } from "@/server/schemas";


export async function AddToWishlist(ProductVariantId: string): Promise<ServerActionAPIResultSchema<object>> {
    try {
        const userId = await GetUserId();
        const productVariantId = await GetProductVariantId(ProductVariantId);

        if (userId !== null && productVariantId !== null) {
            let wishlist = await GetWishlist(userId);
            if (wishlist === null) {
                wishlist = await CreateWishlist(userId);
                await CreateWishlistProduct(wishlist, productVariantId);
            } else {
                let wishlistProduct = await GetWishlistProduct(wishlist, productVariantId);
                if (wishlistProduct === null) {
                    await CreateWishlistProduct(wishlist, productVariantId);
                } else {
                    await UpdateWishlistProduct(wishlistProduct, !wishlistProduct.IsActive);
                }
            }
        }
        return { success: true, error: null, data: null }
    } catch (error) {
        return { success: false, error: error, data: null }
    }
}

export async function AddToCart(ProductVariantId: string, quantity: number): Promise<ServerActionAPIResultSchema<object>> {
    try {
        const userId = await GetUserId();
        const productVariantId = await GetProductVariantId(ProductVariantId);

        if (userId !== null && productVariantId !== null) {
            let cart = await GetCart(userId);
            if (cart === null) {
                cart = await CreateCart(userId);
                await CreateCartProduct(cart, productVariantId, quantity);
            } else {
                let cartProduct = await GetCartProduct(cart, productVariantId);
                if (cartProduct === null) {
                    await CreateCartProduct(cart, productVariantId, quantity);
                } else {
                    await UpdateCartProduct(cartProduct, quantity);
                }
            }
        }
        return { success: true, error: null, data: null }
    } catch (error) {
        return { success: false, error: error, data: null }
    }
}