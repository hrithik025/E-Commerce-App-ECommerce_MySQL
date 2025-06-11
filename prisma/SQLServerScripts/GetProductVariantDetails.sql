DROP PROCEDURE IF EXISTS GetProductVariantDetails;

DELIMITER //

CREATE PROCEDURE GetProductVariantDetails (
    IN p_UserId BIGINT,
    IN p_ProductVariantId BIGINT
)
BEGIN
	DROP TEMPORARY TABLE IF EXISTS TempProductReviews;
    -- Create a temporary table for average ratings and review counts
    CREATE TEMPORARY TABLE TempProductReviews AS
    SELECT
        ProductVariantId,
        CAST(AVG(NoOfStars) AS DECIMAL(4,2)) AS NoOfStars,
        COUNT(Id) AS NoOfReviews
    FROM
        Reviews
    GROUP BY
        ProductVariantId;

    -- Main SELECT query
    SELECT 
        Products.Id AS ProductId,
        ProductVariants.Id AS ProductVariantId,
        Products.Name AS ProductName,
        Products.Label AS ProductLabel,
        ProductCategories.Name AS ProductCategoryName,
        ProductCategories.Label AS ProductCategoryLabel,
        ProductVariants.Label AS ProductVariantName,
        ProductVariants.Price AS OriginalPrice,
        ProductVariants.Quantity,
        ProductVariants.Discount,
        CAST(ProductVariants.Price - (ProductVariants.Price * ProductVariants.Discount / 100) AS DECIMAL(9,2)) AS LatestPrice,
        IFNULL(TempProductReviews.NoOfStars, 0) AS NoOfStars,
        IFNULL(TempProductReviews.NoOfReviews, 0) AS NoOfReviews,
        VariantCategoryConfigs.Name AS VariantCategoryName,
        VariantCategoryConfigs.Label AS VariantCategoryLabel,
        VariantCategoryValueConfigs.Name AS VariantCategoryValueName,
        VariantCategoryValueConfigs.Label AS VariantCategoryValueLabel,
        CAST(CASE WHEN CartProducts.Id IS NOT NULL THEN 1 ELSE 0 END AS UNSIGNED) AS IsPresentInCart,
        CAST(CASE WHEN WishlistProducts.Id IS NOT NULL THEN 1 ELSE 0 END AS UNSIGNED) AS IsWishlisted,
        ProductVariants.Description
    FROM
        Products
    INNER JOIN ProductCategories
        ON Products.ProductCategoryId = ProductCategories.Id
        AND Products.IsActive = 1
    INNER JOIN ProductVariants
        ON Products.Id = ProductVariants.ProductId
        AND ProductVariants.Id = p_ProductVariantId
    INNER JOIN ProductImages
        ON ProductVariants.Id = ProductImages.ProductVariantId
    INNER JOIN ProductVariantDetails
        ON ProductVariantDetails.ProductVariantId = ProductVariants.Id
        AND ProductVariantDetails.IsActive = 1
    INNER JOIN VariantCategoryConfigs
        ON ProductVariantDetails.VariantCategoryId = VariantCategoryConfigs.Id
    INNER JOIN VariantCategoryValueConfigs
        ON VariantCategoryConfigs.Id = VariantCategoryValueConfigs.VariantCategoryId
        AND ProductVariantDetails.VariantValueId = VariantCategoryValueConfigs.Id
    LEFT JOIN TempProductReviews
        ON TempProductReviews.ProductVariantId = ProductVariants.Id
    LEFT JOIN Carts
        ON Carts.UserId = p_UserId
    LEFT JOIN CartProducts
        ON Carts.Id = CartProducts.CartId
        AND CartProducts.ProductVariantId = ProductVariants.Id
        AND CartProducts.IsActive = 1
    LEFT JOIN Wishlists
        ON Wishlists.UserId = p_UserId
    LEFT JOIN WishlistProducts
        ON WishlistProducts.WishlistId = Wishlists.Id
        AND WishlistProducts.ProductVariantId = ProductVariants.Id
        AND WishlistProducts.IsActive = 1;

    -- Optional: Drop the temp table explicitly (optional in MySQL since it's session scoped)
    DROP TEMPORARY TABLE IF EXISTS TempProductReviews;

END //

DELIMITER ;
