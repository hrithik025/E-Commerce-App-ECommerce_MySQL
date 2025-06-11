"use server";
import { GetUserId } from "@/server/entities/actions";
import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetCouponSchema } from "@/server/types/Coupon.type";
import { Coupon } from "@prisma/client";

export async function VerifyCoupon(couponCode: string): Promise<ServerActionAPIResultSchema<null>> {
    try {
        const userId = await GetUserId();

        if (userId !== null) {
            const coupon = await GetCouponByCouponCode(couponCode);

            if (coupon !== null) {
                let isValidated = await ValidateUserCoupons(coupon, userId);
                return { data: null, success: isValidated, error: null }
            }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

async function ValidateUserCoupons(coupon: Coupon, userId: bigint): Promise<boolean> {
    const numberOfCouponUsages = await Repository.UserCoupons.count({
        where: {
            CouponId: coupon.Id,
            UserId: userId
        }
    });

    return numberOfCouponUsages < coupon.MaxNoOfUsagePerUser;
}


export async function GetCouponById(encryptedCouponId: string): Promise<ServerActionAPIResultSchema<GetCouponSchema>> {
    try {
        const userId = await GetUserId();
        const couponId = await GetCouponId(encryptedCouponId);

        if (userId !== null && couponId !== null) {
            const coupon = await Repository.Coupons.findFirst({
                where: {
                    Id: couponId
                }, select: {
                    Id: true,
                    Discount: true
                }
            });

            const data = JSONExtension.Serialize(coupon) as GetCouponSchema;
            return { data: data, success: true, error: null }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetCouponId(encryptedAddressId: string | null) {
    if (encryptedAddressId) {
        const decryptedValue = await CryptoHelper.GetDecryptedValue(encryptedAddressId);
        return decryptedValue;
    }
    return null;
}

export async function GetCouponByCouponCode(couponCode: string | null): Promise<Coupon | null> {
    if (couponCode === null) return null;
    return await Repository.Coupons.findFirst({
        where: {
            CouponCode: couponCode,
            IsActive: true,
        }
    })
}

export async function GetCouponForCartByCouponCode(couponCode: string | null): Promise<ServerActionAPIResultSchema<GetCouponSchema>> {
    try {
        const userId = await GetUserId();
        const coupon = await GetCouponByCouponCode(couponCode);;

        if (userId !== null && coupon !== null) {
            const couponJSON = {
                Id: coupon.Id,
                Discount: coupon.Discount
            }

            const data = JSONExtension.Serialize(couponJSON) as GetCouponSchema;
            return { data: data, success: true, error: null }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}