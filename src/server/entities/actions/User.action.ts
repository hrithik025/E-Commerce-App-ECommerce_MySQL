"use server";
import { UserHelper } from "@/server/entities/helpers/User.helper";
import { CheckEmailExists } from "@/server/entities/queries/User.query";
import { TryDecryptToken } from "@/server/lib/Authenticator";
import { Repository } from "@/server/lib/Repository";
import { ServerActionAPIResultSchema } from "@/server/schemas";
import { signupFormData, SignupResultSchema } from "@/server/types/Signup.type";
import { UserChangePassswordSchema } from "@/server/types/User.type";
import { User } from "@server/entities/models";
import { cookies } from "next/headers";

export async function SetEncryptedPassword(user: User) {
    user.Password = UserHelper.GenerateHashedPassword(user.Email, user.Password);
}

export async function GetAuthToken() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;
    return authToken;
}

export async function GetUserId() {
    const authToken = await GetAuthToken();
    if (authToken) {
        const decryptedValue = await TryDecryptToken(authToken);
        if (decryptedValue.success) {
            const user =
                await Repository.Users.findFirst({
                    where: {
                        UniqueId: decryptedValue.data?.uniqueId
                    },
                    select: {
                        Id: true
                    }
                });
            return user ? user.Id : null;
        }
    }
    return null;
}

export async function ChangePassword(currentPassword: string, newPassword: string): Promise<ServerActionAPIResultSchema<UserChangePassswordSchema>> {
    try {
        const userId = await GetUserId();
        const user = await Repository.Users.findFirst({
            where: {
                Id: userId ?? 0
            }
        });
        if (user !== null && userId !== null) {
            const oldPasswordHash = UserHelper.GenerateHashedPassword(user.Email, currentPassword);
            if (user.Password !== oldPasswordHash) {
                return { data: { message: "Old Password is Incorrect!" }, success: false, error: null }
            } else {
                const newPasswordHash = UserHelper.GenerateHashedPassword(user.Email, newPassword);
                let updatedUser = await Repository.Users.update({
                    where: {
                        Id: userId
                    },
                    data: {
                        LastPasswordUpdated: new Date(),
                        Password: newPasswordHash
                    }
                });
                return { data: { message: "New Password is Updated!" }, success: true, error: null }
            }
        }
    } catch (error) {
        return { data: { message: "Server Error!!!" }, success: false, error: error }
    }
    return { data: null, success: false, error: null }
}

export async function LogoutUser(): Promise<ServerActionAPIResultSchema<null>> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("authToken");
        return { success: true, data: null, error: null };
    } catch (error) {
        return { success: false, data: null, error: error }
    }
}

export async function SignupUser(signupData: signupFormData): Promise<ServerActionAPIResultSchema<SignupResultSchema>> {
    try {
        if (await CheckEmailExists(signupData.Email)) {
            return { success: false, data: { message: "An account already exists for this EmailId" }, error: null }
        } else {
            const newUser = await Repository.Users.create({
                data: {
                    FirstName: signupData.FirstName,
                    LastName: signupData.LastName,
                    Email: signupData.Email,
                    IsActive: true,
                    PhoneNumber: signupData.PhoneNumber,
                    Password: UserHelper.GenerateHashedPassword(signupData.Email, signupData.Password),
                    ActivationDate: new Date()
                }
            });
            return { success: true, data: null, error: null };
        }
    } catch (error) {
        return { success: false, data: null, error: error }
    }
}

export async function DeleteUser(): Promise<ServerActionAPIResultSchema<boolean>> {
    try {
        let userId = await GetUserId();
        if (userId !== null) {
            let data = await Repository.Users.update({
                where: {
                    Id: userId
                }, data: {
                    IsActive: false,
                    DeactivationDate: new Date()
                }
            });
            return { data: true, success: true, error: null }
        }
    } catch (error) {
        return { data: null, success: false, error: error }
    }
    return { data: null, success: false, error: null }
}