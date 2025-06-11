"use server";

import { GetUserId } from "@/server/entities/actions";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { UserAccountDetailsSchema } from "@/server/types/User.type";

export async function GetAccountDetails(): Promise<ServerActionAPIResultSchema<UserAccountDetailsSchema>> {
    try {
        let userId = await GetUserId();
        if (userId !== null) {
            const data = await Repository.Users.findFirst({
                where: {
                    Id: userId
                },
                select: {
                    FirstName: true,
                    LastName: true,
                    CreatedTime: true,
                    Email: true,
                    PhoneNumber: true
                }
            }) as UserAccountDetailsSchema;

            return { data: data, success: true, error: null }
        }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
    return { data: null, success: false, error: null }
}

export async function CheckEmailExists(emailId: string) {
    return (await Repository.Users.findUnique({
        where: {
            Email: emailId,
            IsActive: true
        }
    })) !== null;
}