DROP PROCEDURE IF EXISTS GetProductVariantCategories;

DELIMITER //

CREATE PROCEDURE GetProductVariantCategories (
    IN ProductVariantId BIGINT
)
BEGIN
    SELECT
        opv.Id AS ProductVariantId,
        vcc.Id AS VariantCategoryConfigId,
        vcc.Name AS VariantCategoryName,
        vcc.Label AS VariantCategoryLabel,
        vcvc.Name AS VariantCategoryValueName,
        vcvc.Label AS VariantCategoryValueLabel,
        CAST(CASE WHEN opv.Id = ProductVariantId THEN 1 ELSE 0 END AS UNSIGNED) AS IsSelected
    FROM
        ProductVariants cpv
    JOIN
        ProductVariants opv ON cpv.ProductId = opv.ProductId
        AND cpv.Id = ProductVariantId
        AND opv.IsActive = TRUE
    JOIN
        ProductVariantDetails pvd ON opv.Id = pvd.ProductVariantId
    JOIN
        VariantCategoryConfigs vcc ON pvd.VariantCategoryId = vcc.Id
        AND vcc.IsActive = TRUE
    JOIN
        VariantCategoryValueConfigs vcvc ON pvd.VariantValueId = vcvc.Id
        AND vcvc.VariantCategoryId = vcc.Id
        AND vcvc.IsActive = TRUE;

END //

DELIMITER ;
