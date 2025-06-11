DROP PROCEDURE IF EXISTS CreateOrder;

DELIMITER //

CREATE PROCEDURE CreateOrder (
    IN p_UserId BIGINT,
    IN p_AddressId BIGINT,
    IN p_CouponId BIGINT
)
BEGIN
    DECLARE v_CreatedTime DATETIME DEFAULT NOW();
    DECLARE v_TotalPrice DECIMAL(16,2) DEFAULT 0.00;
    DECLARE v_IsCouponApplied BOOLEAN DEFAULT FALSE;
    DECLARE v_OrderId BIGINT;

    -- Use a handler to manage errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Step 1: Temp Product Details
    DROP TEMPORARY TABLE IF EXISTS TempProductDetails;
    CREATE TEMPORARY TABLE TempProductDetails AS
    SELECT
        p_UserId AS UserId,
        pv.Id AS ProductVariantId,
        cp.Id AS CartProductId,
        cp.Quantity AS CartQuantity,
        pv.Price * cp.Quantity AS OriginalPrice,
        CAST((pv.Price * pv.Discount / 100) AS DECIMAL(9,2)) * cp.Quantity AS DiscountPrice
    FROM
        CartProducts cp
        JOIN Carts c ON cp.CartId = c.Id AND cp.IsActive = 1 AND c.UserId = p_UserId
        JOIN ProductVariants pv ON cp.ProductVariantId = pv.Id;

    -- Step 2: Compute Total Price, Tax and Discount
    -- Subtotals
	SELECT
		sub.SubTotalPrice,
		sub.ProductPrice
	INTO
		@SubTotalPrice,
		@ProductPrice
	FROM (
		SELECT
			SUM(OriginalPrice) AS SubTotalPrice,
			SUM(OriginalPrice - DiscountPrice) AS ProductPrice
		FROM TempProductDetails
	) AS sub;

    -- Tax
    SELECT
        CAST((s.TaxRate + co.TaxRate) AS DECIMAL(16,2)) / 100
    INTO @TotalTaxRate
    FROM Addresses a
    JOIN States s ON a.StateId = s.Id
    JOIN Countries co ON s.CountryId = co.Id
    WHERE a.Id = p_AddressId;

    -- Coupon
    SELECT
        c.Id,
        CAST(c.Discount AS DECIMAL(16,2)) / 100
    INTO @CouponIdCheck, @DiscountRate
    FROM Coupons c
    LEFT JOIN UserCoupons uc ON c.Id = uc.CouponId AND uc.UserId = p_UserId AND c.IsActive = 1
    WHERE c.Id = p_CouponId
    GROUP BY c.Id, c.Discount, c.MaxNoOfUsagePerUser
    HAVING COUNT(uc.Id) < c.MaxNoOfUsagePerUser;

    -- Final price
    SET v_TotalPrice = @ProductPrice
        - IF(@CouponIdCheck IS NULL, 0, @SubTotalPrice * @DiscountRate)
        + IF(@TotalTaxRate IS NULL, 0, @SubTotalPrice * @TotalTaxRate);
    SET v_IsCouponApplied = IF(@CouponIdCheck IS NULL, FALSE, TRUE);

    -- Step 3: Create Order if valid
    IF v_TotalPrice > 0 THEN
        INSERT INTO Orders (CreatedTime, UserId, TotalPrice)
        VALUES (v_CreatedTime, p_UserId, v_TotalPrice);
        SET v_OrderId = LAST_INSERT_ID();

        -- Insert Order Products
        INSERT INTO OrderProducts (
            CreatedTime, Quantity, Price, Status, OrderDate, DeliveryDate,
            OrderId, ProductVariantId, AddressId, RandomId
        )
        SELECT
            v_CreatedTime,
            t.CartQuantity,
            t.OriginalPrice - t.DiscountPrice,
            'Ordered',
            CURDATE(),
            NULL,
            v_OrderId,
            t.ProductVariantId,
            p_AddressId,
            LEFT(HEX(RANDOM_BYTES(10)), 15)
        FROM TempProductDetails t;

        -- Update Inventory
        UPDATE ProductVariants pv
        JOIN TempProductDetails t ON pv.Id = t.ProductVariantId
        SET pv.Quantity = pv.Quantity - t.CartQuantity;

        -- Deactivate Cart Products
        UPDATE CartProducts cp
        JOIN TempProductDetails t ON cp.Id = t.CartProductId
        SET cp.IsActive = 0;

        -- Insert into UserCoupons if applicable
        IF p_CouponId IS NOT NULL AND v_IsCouponApplied THEN
            INSERT INTO UserCoupons (CreatedTime, CouponId, UserId, OrderId)
            VALUES (v_CreatedTime, p_CouponId, p_UserId, v_OrderId);
        END IF;
    END IF;

    COMMIT;
END //

DELIMITER ;
