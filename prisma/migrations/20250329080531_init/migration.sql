BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[FileStoreConfigs] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [FileStoreConfigs_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [Name] NVARCHAR(50) NOT NULL,
    [FileStoragePath] NVARCHAR(250) NOT NULL,
    CONSTRAINT [FileStoreConfigs_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Users_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [UniqueId] NVARCHAR(1000) NOT NULL,
    [FirstName] NVARCHAR(50) NOT NULL,
    [LastName] NVARCHAR(50) NOT NULL,
    [PhoneNumber] NVARCHAR(10) NOT NULL,
    [Email] NVARCHAR(50) NOT NULL,
    [Password] NVARCHAR(64) NOT NULL,
    [LastPasswordUpdated] DATETIME2,
    [LastAccessedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [ActivationDate] DATETIME2,
    [DeactivationDate] DATETIME2,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Users_Email_key] UNIQUE NONCLUSTERED ([Email])
);

-- CreateTable
CREATE TABLE [dbo].[UserImage] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [UserImage_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [FileName] NVARCHAR(100) NOT NULL,
    [FileExtension] NVARCHAR(5) NOT NULL,
    [FileStoreConfigId] BIGINT NOT NULL,
    [UserId] BIGINT NOT NULL,
    CONSTRAINT [UserImage_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [UserImage_UserId_key] UNIQUE NONCLUSTERED ([UserId])
);

-- CreateTable
CREATE TABLE [dbo].[ProductCategories] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [ProductCategories_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [Name] NVARCHAR(1000) NOT NULL,
    [IsActive] BIT NOT NULL,
    CONSTRAINT [ProductCategories_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [ProductCategories_Name_key] UNIQUE NONCLUSTERED ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[TaxTypes] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [TaxTypes_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [Name] NVARCHAR(100) NOT NULL,
    [IsActive] BIT NOT NULL,
    CONSTRAINT [TaxTypes_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [TaxTypes_Name_key] UNIQUE NONCLUSTERED ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[Countries] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Countries_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [Name] NVARCHAR(100) NOT NULL,
    [IsActive] BIT NOT NULL,
    [ISOCode] NVARCHAR(4) NOT NULL,
    [CurrencyCode] NVARCHAR(4) NOT NULL,
    [CurrencySymbol] CHAR NOT NULL,
    [TaxRate] DECIMAL(16,2) NOT NULL,
    [TaxTypeId] BIGINT NOT NULL,
    CONSTRAINT [Countries_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Countries_Name_key] UNIQUE NONCLUSTERED ([Name]),
    CONSTRAINT [Countries_ISOCode_key] UNIQUE NONCLUSTERED ([ISOCode])
);

-- CreateTable
CREATE TABLE [dbo].[States] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [States_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [Name] NVARCHAR(100) NOT NULL,
    [IsActive] BIT NOT NULL,
    [TaxRate] DECIMAL(16,2) NOT NULL,
    [CountryId] BIGINT NOT NULL,
    CONSTRAINT [States_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [States_Name_key] UNIQUE NONCLUSTERED ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[Addresses] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Addresses_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [FirstName] NVARCHAR(50) NOT NULL,
    [LastName] NVARCHAR(50) NOT NULL,
    [PhoneNumber] NVARCHAR(10) NOT NULL,
    [Email] NVARCHAR(50) NOT NULL,
    [Address] NVARCHAR(250) NOT NULL,
    [Landmark] NVARCHAR(100) NOT NULL,
    [PinCode] NVARCHAR(6) NOT NULL,
    [City] NVARCHAR(50) NOT NULL,
    [StateId] BIGINT NOT NULL,
    [UserId] BIGINT NOT NULL,
    CONSTRAINT [Addresses_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Addresses_Email_key] UNIQUE NONCLUSTERED ([Email])
);

-- CreateTable
CREATE TABLE [dbo].[WareHouseddresses] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [WareHouseddresses_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [AddressId] BIGINT NOT NULL,
    CONSTRAINT [WareHouseddresses_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[VariantCategoryConfigs] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [VariantCategoryConfigs_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Label] NVARCHAR(100) NOT NULL,
    CONSTRAINT [VariantCategoryConfigs_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[VariantCategoryValueConfigs] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [VariantCategoryValueConfigs_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [VariantCategoryId] BIGINT NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Label] NVARCHAR(100) NOT NULL,
    CONSTRAINT [VariantCategoryValueConfigs_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Products] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Products_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [ProductCategoryId] BIGINT NOT NULL,
    CONSTRAINT [Products_pkey] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [Products_Name_key] UNIQUE NONCLUSTERED ([Name])
);

-- CreateTable
CREATE TABLE [dbo].[ProductImages] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [ProductImages_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [FileName] NVARCHAR(100) NOT NULL,
    [FileExtension] NVARCHAR(5) NOT NULL,
    [FileStoreConfigId] BIGINT NOT NULL,
    [ProductId] BIGINT NOT NULL,
    CONSTRAINT [ProductImages_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductVariants] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [ProductVariants_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [IsDefault] BIT NOT NULL,
    [Name] NVARCHAR(500) NOT NULL,
    [ProductId] BIGINT NOT NULL,
    [Quantity] BIGINT NOT NULL,
    [Price] DECIMAL(16,2) NOT NULL,
    [Discount] INT NOT NULL,
    CONSTRAINT [ProductVariants_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductVariantDetails] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [ProductVariantDetails_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [ProductVariantId] BIGINT NOT NULL,
    [VariantCategoryId] BIGINT NOT NULL,
    [VariantValueId] BIGINT NOT NULL,
    CONSTRAINT [ProductVariantDetails_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Reviews] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Reviews_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [UserId] BIGINT NOT NULL,
    [ProductVariantId] BIGINT NOT NULL,
    [NoOfStars] INT NOT NULL,
    [Comment] NTEXT NOT NULL,
    [PostedDate] DATETIME2 NOT NULL,
    CONSTRAINT [Reviews_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Wishlists] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Wishlists_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [UserId] BIGINT NOT NULL,
    CONSTRAINT [Wishlists_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[WishlistProducts] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [WishlistProducts_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [AddedDate] DATETIME2 NOT NULL,
    [WishlistId] BIGINT NOT NULL,
    [ProductVariantId] BIGINT NOT NULL,
    CONSTRAINT [WishlistProducts_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Carts] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Carts_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [UserId] BIGINT NOT NULL,
    CONSTRAINT [Carts_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[CartProducts] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [CartProducts_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [Quantity] BIGINT NOT NULL,
    [AddedDate] DATETIME2 NOT NULL,
    [CartId] BIGINT NOT NULL,
    [ProductVariantId] BIGINT NOT NULL,
    CONSTRAINT [CartProducts_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Orders] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Orders_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [UserId] BIGINT NOT NULL,
    [TotalPrice] DECIMAL(16,2) NOT NULL,
    CONSTRAINT [Orders_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[OrderProducts] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [OrderProducts_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [Quantity] BIGINT NOT NULL,
    [Price] DECIMAL(16,2) NOT NULL,
    [Status] NVARCHAR(1000) NOT NULL,
    [OrderDate] DATETIME2 NOT NULL,
    [DeliveryDate] DATETIME2,
    [OrderId] BIGINT NOT NULL,
    [ProductVariantId] BIGINT NOT NULL,
    [AddressId] BIGINT NOT NULL,
    CONSTRAINT [OrderProducts_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[OrderProductDetail] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [OrderProductDetail_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [OrderProductId] BIGINT NOT NULL,
    [AddressId] BIGINT NOT NULL,
    [ReachedDate] DATETIME2 NOT NULL,
    [IsWareHouse] BIT NOT NULL,
    CONSTRAINT [OrderProductDetail_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Coupons] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [Coupons_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [IsActive] BIT NOT NULL,
    [CouponCode] NVARCHAR(50) NOT NULL,
    [MaxNoOfUsagePerUser] BIGINT NOT NULL,
    [Discount] INT NOT NULL,
    CONSTRAINT [Coupons_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[UserCoupon] (
    [Id] BIGINT NOT NULL IDENTITY(1,1),
    [CreatedTime] DATETIME2 NOT NULL CONSTRAINT [UserCoupon_CreatedTime_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedTime] DATETIME2,
    [CouponId] BIGINT NOT NULL,
    [UserId] BIGINT NOT NULL,
    [OrderId] BIGINT NOT NULL,
    CONSTRAINT [UserCoupon_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserImage] ADD CONSTRAINT [UserImage_FileStoreConfigId_fkey] FOREIGN KEY ([FileStoreConfigId]) REFERENCES [dbo].[FileStoreConfigs]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserImage] ADD CONSTRAINT [UserImage_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Countries] ADD CONSTRAINT [Countries_TaxTypeId_fkey] FOREIGN KEY ([TaxTypeId]) REFERENCES [dbo].[TaxTypes]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[States] ADD CONSTRAINT [States_CountryId_fkey] FOREIGN KEY ([CountryId]) REFERENCES [dbo].[Countries]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [Addresses_StateId_fkey] FOREIGN KEY ([StateId]) REFERENCES [dbo].[States]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Addresses] ADD CONSTRAINT [Addresses_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WareHouseddresses] ADD CONSTRAINT [WareHouseddresses_AddressId_fkey] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Addresses]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VariantCategoryValueConfigs] ADD CONSTRAINT [VariantCategoryValueConfigs_VariantCategoryId_fkey] FOREIGN KEY ([VariantCategoryId]) REFERENCES [dbo].[VariantCategoryConfigs]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [Products_ProductCategoryId_fkey] FOREIGN KEY ([ProductCategoryId]) REFERENCES [dbo].[ProductCategories]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductImages] ADD CONSTRAINT [ProductImages_FileStoreConfigId_fkey] FOREIGN KEY ([FileStoreConfigId]) REFERENCES [dbo].[FileStoreConfigs]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductImages] ADD CONSTRAINT [ProductImages_ProductId_fkey] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductVariants] ADD CONSTRAINT [ProductVariants_ProductId_fkey] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductVariantDetails] ADD CONSTRAINT [ProductVariantDetails_ProductVariantId_fkey] FOREIGN KEY ([ProductVariantId]) REFERENCES [dbo].[ProductVariants]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductVariantDetails] ADD CONSTRAINT [ProductVariantDetails_VariantCategoryId_fkey] FOREIGN KEY ([VariantCategoryId]) REFERENCES [dbo].[VariantCategoryConfigs]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProductVariantDetails] ADD CONSTRAINT [ProductVariantDetails_VariantValueId_fkey] FOREIGN KEY ([VariantValueId]) REFERENCES [dbo].[VariantCategoryValueConfigs]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reviews] ADD CONSTRAINT [Reviews_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reviews] ADD CONSTRAINT [Reviews_ProductVariantId_fkey] FOREIGN KEY ([ProductVariantId]) REFERENCES [dbo].[ProductVariants]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Wishlists] ADD CONSTRAINT [Wishlists_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WishlistProducts] ADD CONSTRAINT [WishlistProducts_WishlistId_fkey] FOREIGN KEY ([WishlistId]) REFERENCES [dbo].[Wishlists]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WishlistProducts] ADD CONSTRAINT [WishlistProducts_ProductVariantId_fkey] FOREIGN KEY ([ProductVariantId]) REFERENCES [dbo].[ProductVariants]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Carts] ADD CONSTRAINT [Carts_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CartProducts] ADD CONSTRAINT [CartProducts_CartId_fkey] FOREIGN KEY ([CartId]) REFERENCES [dbo].[Carts]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CartProducts] ADD CONSTRAINT [CartProducts_ProductVariantId_fkey] FOREIGN KEY ([ProductVariantId]) REFERENCES [dbo].[ProductVariants]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[OrderProducts] ADD CONSTRAINT [OrderProducts_OrderId_fkey] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderProducts] ADD CONSTRAINT [OrderProducts_ProductVariantId_fkey] FOREIGN KEY ([ProductVariantId]) REFERENCES [dbo].[ProductVariants]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderProducts] ADD CONSTRAINT [OrderProducts_AddressId_fkey] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Addresses]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[OrderProductDetail] ADD CONSTRAINT [OrderProductDetail_OrderProductId_fkey] FOREIGN KEY ([OrderProductId]) REFERENCES [dbo].[OrderProducts]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderProductDetail] ADD CONSTRAINT [OrderProductDetail_AddressId_fkey] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Addresses]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCoupon] ADD CONSTRAINT [UserCoupon_CouponId_fkey] FOREIGN KEY ([CouponId]) REFERENCES [dbo].[Coupons]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCoupon] ADD CONSTRAINT [UserCoupon_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCoupon] ADD CONSTRAINT [UserCoupon_OrderId_fkey] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders]([Id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
