DROP PROCEDURE IF EXISTS GetUserAddresses;

DELIMITER //

CREATE PROCEDURE GetUserAddresses (
    IN UserId BIGINT,
    IN AddressId BIGINT
)
BEGIN
    SELECT
        a.Id AS Id,
        a.FirstName AS FirstName,
        a.LastName AS LastName,
        a.Address AS Address,
        a.Landmark AS Landmark,
        a.City AS City,
        s.Name AS State,
        a.PinCode AS PinCode,
        a.Email AS Email,
        a.PhoneNumber AS PhoneNumber,
        s.TaxRate AS StateTaxRate,
        c.TaxRate AS CountryTaxRate,
        tt.Name AS TaxTypeName
    FROM
        Addresses a
    JOIN
        Users u ON a.UserId = u.Id
        AND a.IsActive = TRUE
        AND u.Id = UserId
    JOIN
        States s ON a.StateId = s.Id
        AND s.IsActive = TRUE
    JOIN
        Countries c ON s.CountryId = c.Id
    JOIN
        TaxTypes tt ON c.TaxTypeId = tt.Id
    WHERE
        AddressId IS NULL OR a.Id = AddressId;
END //

DELIMITER ;
