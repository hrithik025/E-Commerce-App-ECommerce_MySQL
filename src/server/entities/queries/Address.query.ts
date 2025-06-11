"use server";
import { GetUserId } from "@/server/entities/actions";
import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { prisma } from "@/server/lib/prisma";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetAddressesForCartSchema, GetAddressesForUserSchema } from "@/server/types/Address.type";

export async function GetAddressesForCart(): Promise<ServerActionAPIResultSchema<GetAddressesForCartSchema[]>> {
    try {
        const userId = await GetUserId();

        if (userId !== null) {
            const result = await prisma.$queryRaw`CALL GetUserAddresses(${userId},NULL);` as any[];
            const addresses = Repository.MapProcedureResult<GetAddressesForCartSchema>(result, ['Id', 'FirstName', 'LastName', 'Address', 'Landmark', 'City', 'State', 'PinCode', 'Email', 'PhoneNumber', 'StateTaxRate', 'CountryTaxRate', 'TaxTypeName']);
            const data = JSONExtension.Serialize(addresses) as GetAddressesForCartSchema[];
            if (Array.isArray(data) && data.length > 0) {
                return { data: data, success: true, error: null }
            }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetAddressById(encryptedAddressId: string): Promise<ServerActionAPIResultSchema<GetAddressesForCartSchema>> {
    try {
        const userId = await GetUserId();
        const addressId = await GetAddressId(encryptedAddressId);

        if (userId !== null && addressId !== null) {
            const result = await prisma.$queryRaw`CALL GetUserAddresses(${userId},${addressId});` as any[];
            const addresses = Repository.MapProcedureResult<GetAddressesForCartSchema>(result, ['Id', 'FirstName', 'LastName', 'Address', 'Landmark', 'City', 'State', 'PinCode', 'Email', 'PhoneNumber', 'StateTaxRate', 'CountryTaxRate', 'TaxTypeName']);
            const data = JSONExtension.Serialize(addresses) as GetAddressesForCartSchema[];
            if (Array.isArray(data) && data.length > 0) {
                return { data: data[0], success: true, error: null }
            }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetAddressId(encryptedAddressId: string | null) {
    if (encryptedAddressId) {
        const decryptedValue = await CryptoHelper.GetDecryptedValue(encryptedAddressId);
        return decryptedValue;
    }
    return null;
}

export async function GetAddressesForUser(): Promise<ServerActionAPIResultSchema<GetAddressesForUserSchema[]>> {
    try {
        const userId = await GetUserId();
        if (userId !== null) {
            let data = await prisma.$queryRaw`
                SELECT
                    Addresses.Id,
                    States.Id StateId,
                    Addresses.FirstName,
                    Addresses.LastName,
                    Addresses.Email,
                    Addresses.City,
                    Addresses.PhoneNumber,
                    Addresses.Address,
                    Addresses.Landmark,
                    States.Name State,
                    Countries.Name Country,
                    Addresses.PinCode
                FROM
                    Addresses
                    JOIN States
                        ON States.Id = Addresses.StateId
                        AND Addresses.IsActive = 1
                    JOIN Countries
                        ON States.CountryId = Countries.Id
                WHERE
                    Addresses.UserId = ${userId}
            `;

            const addressesData = JSONExtension.Serialize(data) as GetAddressesForUserSchema[];
            return { success: true, data: addressesData, error: null }
        }
    } catch (error) {
        return { success: false, data: [], error: error }
    }
    return { success: false, data: [], error: null }
}