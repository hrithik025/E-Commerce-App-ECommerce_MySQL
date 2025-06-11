"use server";

import { GetUserId } from "@/server/entities/actions/User.action";
import { GetAddressId } from "@/server/entities/queries/Address.query";
import { GetStateId } from "@/server/entities/queries/State.query";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { AddressFormData, GetAddressesForCartSchema } from "@/server/types/Address.type";

export async function CreateAddress(data: AddressFormData): Promise<ServerActionAPIResultSchema<GetAddressesForCartSchema>> {
    try {
        let userId = await GetUserId();
        let stateId = await GetStateId(data.State);

        if (stateId !== null && userId !== null) {
            let address = await Repository.Addresses.create({
                data: {
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Address: data.Address,
                    City: data.City,
                    Email: data.Email,
                    IsActive: true,
                    Landmark: data.Landmark ?? "",
                    PhoneNumber: data.PhoneNumber,
                    PinCode: data.PinCode,
                    StateId: stateId,
                    UserId: userId
                }
            });

            let serializedData = JSONExtension.Serialize(address) as GetAddressesForCartSchema;
            return { data: serializedData, success: true, error: null }
        }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
    return { data: null, success: false, error: null };
}

export async function EditAddress(encryptedAddressId: string, data: AddressFormData): Promise<ServerActionAPIResultSchema<GetAddressesForCartSchema>> {
    try {
        let userId = await GetUserId();
        let addressId = await GetAddressId(encryptedAddressId);
        let stateId = await GetStateId(data.State);

        if (stateId !== null && userId !== null && addressId !== null) {
            let address = await Repository.Addresses.update({
                data: {
                    FirstName: data.FirstName,
                    LastName: data.LastName,
                    Address: data.Address,
                    City: data.City,
                    Email: data.Email,
                    IsActive: true,
                    Landmark: data.Landmark ?? "",
                    PhoneNumber: data.PhoneNumber,
                    PinCode: data.PinCode,
                    StateId: stateId,
                    UserId: userId
                }, where: {
                    Id: addressId
                }
            });

            let serializedData = JSONExtension.Serialize(address) as GetAddressesForCartSchema;
            return { data: serializedData, success: true, error: null }
        }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
    return { data: null, success: false, error: null };
}

export async function DeleteAddress(encryptedAddressId: string): Promise<ServerActionAPIResultSchema<boolean>> {
    try {
        let addressId = await GetAddressId(encryptedAddressId);
        if (addressId !== null) {
            let data = await Repository.Addresses.update({
                where: {
                    Id: addressId
                }, data: {
                    IsActive: false
                }
            });
            return { data: true, success: true, error: null }
        }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
    return { data: null, success: false, error: null }
}