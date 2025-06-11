import { User } from "@server/entities/models";
import { prisma } from "@/server/lib/prisma";

export class Repository {
    // Fetch Entities
    public static Users = prisma.user;
    public static Products = prisma.product;
    public static ProductCategories = prisma.productCategory;
    public static ProductVariants = prisma.productVariant;
    public static Wishlists = prisma.wishlist;
    public static WishlistProducts = prisma.wishlistProduct;
    public static Carts = prisma.cart;
    public static CartProducts = prisma.cartProduct;
    public static States = prisma.state;
    public static Addresses = prisma.address;
    public static Coupons = prisma.coupon;
    public static UserCoupons = prisma.userCoupon;
    public static ProductImages = prisma.productImage;
    public static FileStoreConfigs = prisma.fileStoreConfig;
    public static ProductSpecifications = prisma.productSpecification;
    public static Reviews = prisma.review;
    public static Orders = prisma.order;
    public static OrderProducts = prisma.orderProduct;

    public static CreateUser = (): User => {
        return new User();
    }

    public static MapProcedureResult<T>(result: any[], fieldMap: (keyof T)[]): T[] {
        return result.map((row: any) => {
            const mapped: any = {};
            fieldMap.forEach((key, index) => {
                mapped[key] = row[`f${index}`];
            });
            return mapped as T;
        });
    }
}