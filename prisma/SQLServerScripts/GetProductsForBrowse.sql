DROP PROCEDURE IF EXISTS GetProductsForBrowse;

DELIMITER //

CREATE PROCEDURE GetProductsForBrowse (
    IN UserId BIGINT,
    IN SortBy NVARCHAR(20)
)
BEGIN
    -- Temporary table for product reviews
    DROP TEMPORARY TABLE IF EXISTS TempProductReviews;
    CREATE TEMPORARY TABLE TempProductReviews (
        ProductVariantId BIGINT,
        NoOfStars DECIMAL(4,2),
        NoOfReviews BIGINT
    );

    INSERT INTO TempProductReviews (ProductVariantId, NoOfStars, NoOfReviews)
    SELECT
        ProductVariantId,
        AVG(NoOfStars),
        COUNT(Id)
    FROM
        Reviews
    GROUP BY
        ProductVariantId;

    -- Temporary table for product browse data
    DROP TEMPORARY TABLE IF EXISTS TempProductBrowseData;
    CREATE TEMPORARY TABLE TempProductBrowseData (
        ProductId BIGINT,
        ProductVariantId BIGINT,
        ProductName NVARCHAR(255),
        ProductLabel NVARCHAR(255),
        ProductCategoryName NVARCHAR(255),
        ProductVariantName NVARCHAR(255),
        OriginalPrice DECIMAL(10,2),
        Discount DECIMAL(5,2),
        NewPrice DECIMAL(9,2),
        NoOfStars DECIMAL(4,2),
        NoOfReviews BIGINT,
        IsWishlisted BOOLEAN
    );

    INSERT INTO TempProductBrowseData (ProductId, ProductVariantId, ProductName, ProductLabel, ProductCategoryName, ProductVariantName, OriginalPrice, Discount, NewPrice, NoOfStars, NoOfReviews, IsWishlisted)
    SELECT
        p.Id,
        pv.Id,
        p.Name,
        p.Label,
        pc.Name,
        pv.Label,
        pv.Price,
        pv.Discount,
        CAST(pv.Price - (pv.Price * pv.Discount / 100) AS DECIMAL(9,2)),
        COALESCE(tpr.NoOfStars, 0),
        COALESCE(tpr.NoOfReviews, 0),
        CAST(COALESCE(wp.IsActive, 0) AS UNSIGNED)
    FROM
        Products p
    JOIN
        ProductCategories pc ON p.ProductCategoryId = pc.Id
        AND p.IsActive = TRUE
    JOIN
        ProductVariants pv ON p.Id = pv.ProductId
        AND pv.IsActive = TRUE
        AND pv.IsDefault = TRUE
    LEFT JOIN
        TempProductReviews tpr ON tpr.ProductVariantId = pv.Id
    LEFT JOIN
        WishlistProducts wp ON wp.ProductVariantId = pv.Id
    LEFT JOIN
        Wishlists w ON wp.WishlistId = w.Id
        AND w.UserId = UserId;

    IF SortBy IS NULL THEN
        SELECT * FROM TempProductBrowseData;
    ELSEIF SortBy = 'latest' THEN
        SELECT t.*
        FROM TempProductBrowseData t
        JOIN ProductVariants pv ON t.ProductVariantId = pv.Id
        ORDER BY pv.CreatedTime DESC;
    ELSEIF SortBy = 'popularity' THEN
        DROP TEMPORARY TABLE IF EXISTS TempNumberOfUsages;
        CREATE TEMPORARY TABLE TempNumberOfUsages (
            ProductVariantId BIGINT,
            NumberOfUsages BIGINT
        );

        INSERT INTO TempNumberOfUsages (ProductVariantId, NumberOfUsages)
        SELECT
            tpb.ProductVariantId,
            SUM(COALESCE(cp.Quantity, 0)) + SUM(COALESCE(wp.Id, 0))
        FROM
            TempProductBrowseData tpb
        LEFT JOIN
            CartProducts cp ON cp.ProductVariantId = tpb.ProductVariantId
            AND cp.IsActive = TRUE
        LEFT JOIN
            WishlistProducts wp ON wp.ProductVariantId = tpb.ProductVariantId
            AND wp.IsActive = TRUE
        GROUP BY
            tpb.ProductVariantId;

        SELECT tpb.*
        FROM TempProductBrowseData tpb
        JOIN TempNumberOfUsages tnu ON tpb.ProductVariantId = tnu.ProductVariantId
        ORDER BY tnu.NumberOfUsages DESC;
    ELSEIF SortBy = 'priceLowToHigh' THEN
        SELECT * FROM TempProductBrowseData ORDER BY NewPrice ASC;
    ELSEIF SortBy = 'priceHighToLow' THEN
        SELECT * FROM TempProductBrowseData ORDER BY NewPrice DESC;
    END IF;

END //

DELIMITER ;
