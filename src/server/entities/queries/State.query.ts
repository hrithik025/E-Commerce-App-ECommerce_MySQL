"use server";
import { GetUserId } from "@/server/entities/actions";
import { CryptoHelper } from "@/server/lib/CryptoHelper";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { GetStatesForAddressFormSchema } from "@/server/types/State.type";

export async function GetStatesForAddressForm(): Promise<ServerActionAPIResultSchema<GetStatesForAddressFormSchema[]>> {
    try {
        const userId = await GetUserId();

        if (userId !== null) {
            const states = await Repository.States.findMany({
                where: {
                    IsActive: true
                }
            });
            const data = JSONExtension.Serialize(states) as GetStatesForAddressFormSchema[];
            if (Array.isArray(data) && data.length > 0) {
                return { data: data, success: true, error: null }
            }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetStatesById(encryptedAddressId: string): Promise<ServerActionAPIResultSchema<GetStatesForAddressFormSchema>> {
    try {
        const userId = await GetUserId();
        const stateId = await GetStateId(encryptedAddressId);

        if (userId !== null && stateId !== null) {
            const addresses = await Repository.States.findMany({
                where: {
                    AND: {
                        Id: stateId,
                        IsActive: true,
                    }
                }
            });
            const data = JSONExtension.Serialize(addresses) as GetStatesForAddressFormSchema[];
            if (Array.isArray(data) && data.length > 0) {
                return { data: data[0], success: true, error: null }
            }
        }
        return { data: null, success: false, error: null }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
}

export async function GetStateId(encryptedStateId: string | null) {
    if (encryptedStateId) {
        const decryptedValue = await CryptoHelper.GetDecryptedValue(encryptedStateId);
        return decryptedValue;
    }
    return null;
}

export async function GetStateByName(name: string) {
    return await Repository.States.findFirst({
        where: {
            Name: name
        }
    })
}