DROP PROCEDURE IF EXISTS GetProductVariantsForCart;

DELIMITER //

CREATE PROCEDURE GetProductVariantsForCart (
    IN UserId BIGINT
)
BEGIN
    -- Temporary table for product variant image details
    DROP TEMPORARY TABLE IF EXISTS TempProductVariantImageDetails;
    CREATE TEMPORARY TABLE TempProductVariantImageDetails (
        RowNumber INT,
        ProductVariantId BIGINT,
        ProductImageId BIGINT
    );

    INSERT INTO TempProductVariantImageDetails (RowNumber, ProductVariantId, ProductImageId)
    SELECT
        ROW_NUMBER() OVER (PARTITION BY pi.ProductVariantId ORDER BY pi.Id),
        pi.ProductVariantId,
        pi.Id
    FROM
        CartProducts cp
    JOIN
        ProductImages pi ON cp.ProductVariantId = pi.ProductVariantId
        AND cp.IsActive = TRUE
        AND pi.IsActive = TRUE;

    -- Main select query
    SELECT
        p.Id AS ProductId,
        pv.Id AS ProductVariantId,
        cp.Id AS CartProductId,
        p.Name AS ProductName,
        p.Label AS ProductLabel,
        pc.Name AS ProductCategoryName,
        pc.Label AS ProductCategoryLabel,
        pv.Label AS ProductVariantName,
        pv.Price AS OriginalPrice,
        pv.Quantity AS Quantity,
        cp.Quantity AS CartProductQuantity,
        pv.Discount AS Discount,
        CAST(pv.Price - (pv.Price * pv.Discount / 100) AS DECIMAL(9,2)) AS LatestPrice,
        vcc.Name AS VariantCategoryName,
        vcc.Label AS VariantCategoryLabel,
        vcvc.Name AS VariantCategoryValueName,
        vcvc.Label AS VariantCategoryValueLabel,
        tpvid.ProductImageId AS ProductImageId
    FROM
        CartProducts cp
    JOIN
        ProductVariants pv ON cp.ProductVariantId = pv.Id
        AND cp.IsActive = TRUE
    JOIN
        Carts c ON cp.CartId = c.Id
        AND c.UserId = UserId
    JOIN
        Products p ON pv.ProductId = p.Id
    JOIN
        ProductCategories pc ON p.ProductCategoryId = pc.Id
        AND p.IsActive = TRUE
    JOIN
        TempProductVariantImageDetails tpvid ON pv.Id = tpvid.ProductVariantId
        AND tpvid.RowNumber = 1
    JOIN
        ProductVariantDetails pvd ON pv.Id = pvd.ProductVariantId
        AND pvd.IsActive = TRUE
    JOIN
        VariantCategoryConfigs vcc ON pvd.VariantCategoryId = vcc.Id
    JOIN
        VariantCategoryValueConfigs vcvc ON vcc.Id = vcvc.VariantCategoryId
        AND pvd.VariantValueId = vcvc.Id;

END //

DELIMITER ;
