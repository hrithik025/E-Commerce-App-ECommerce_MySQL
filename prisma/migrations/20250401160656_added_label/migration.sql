/*
  Warnings:

  - You are about to drop the `OrderProductDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCoupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Label` to the `ProductCategories` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[OrderProductDetail] DROP CONSTRAINT [OrderProductDetail_AddressId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[OrderProductDetail] DROP CONSTRAINT [OrderProductDetail_OrderProductId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserCoupon] DROP CONSTRAINT [UserCoupon_CouponId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserCoupon] DROP CONSTRAINT [UserCoupon_OrderId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserCoupon] DROP CONSTRAINT [UserCoupon_UserId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserImage] DROP CONSTRAINT [UserImage_FileStoreConfigId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserImage] DROP CONSTRAINT [UserImage_UserId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Countries] ALTER COLUMN [CurrencySymbol] CHAR NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ProductCategories] ADD [Label] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[OrderProductDetail];

-- DropTable
DROP TABLE [dbo].[UserCoupon];

-- DropTable
DROP TABLE [dbo].[UserImage];

-- CreateTable
CREATE TABLE [dbo].[UserImages] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [UserImages_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [FileName] NVARCHAR(100) NOT NULL,
    [FileExtension] NVARCHAR(5) NOT NULL,
    [FileStoreConfigId] BIGINT NOT NULL,
    [UserId] BIGINT NOT NULL,
    CONSTRAINT [UserImages_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [UserImages_UserId_key] UNIQUE NONCLUSTERED ([UserId])
);

-- CreateTable
CREATE TABLE [dbo].[OrderProductDetails] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [OrderProductDetails_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [OrderProductId] BIGINT NOT NULL,
    [AddressId] BIGINT NOT NULL,
    [ReachedDate] DATETIME2 NOT NULL,
    [IsWareHouse] BIT NOT NULL,
    CONSTRAINT [OrderProductDetails_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[UserCoupons] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [UserCoupons_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [CouponId] BIGINT NOT NULL,
    [UserId] BIGINT NOT NULL,
    [OrderId] BIGINT NOT NULL,
    CONSTRAINT [UserCoupons_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserImages] ADD CONSTRAINT [UserImages_FileStoreConfigId_fkey] FOREIGN KEY ([FileStoreConfigId]) REFERENCES [dbo].[FileStoreConfigs]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserImages] ADD CONSTRAINT [UserImages_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderProductDetails] ADD CONSTRAINT [OrderProductDetails_OrderProductId_fkey] FOREIGN KEY ([OrderProductId]) REFERENCES [dbo].[OrderProducts]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderProductDetails] ADD CONSTRAINT [OrderProductDetails_AddressId_fkey] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Addresses]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCoupons] ADD CONSTRAINT [UserCoupons_CouponId_fkey] FOREIGN KEY ([CouponId]) REFERENCES [dbo].[Coupons]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCoupons] ADD CONSTRAINT [UserCoupons_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCoupons] ADD CONSTRAINT [UserCoupons_OrderId_fkey] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
