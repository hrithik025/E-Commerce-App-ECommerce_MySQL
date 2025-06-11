import { ZodError } from "zod";
import { User } from "@server/entities/models";
import { LoginFormSchema } from "@server/schemas";
import { Messages } from "@/server/lib/Messages";
import { Repository } from "@/server/lib/Repository";
import { StatusCodes } from "@/server/lib/StatusCodes";
import { NextRequest, NextResponse } from "next/server";
import { UserHelper } from "@/server/entities/helpers/User.helper";
import { GenerateToken } from "@/server/lib/Authenticator";
import { cookies } from "next/headers";
import { setToken } from "@/middleware";

export async function POST(request: NextRequest) {
    try {
        const json = await request.json();
        const loginData = LoginFormSchema.parse(json);

        // DB Check
        const existingUserByEmail = await Repository.Users.findUnique({
            where: { Email: loginData.email, IsActive: true }
        }) as User;

        if (existingUserByEmail && existingUserByEmail.Password === UserHelper.GenerateHashedPassword(loginData.email, loginData.password)) {
            const token = await GenerateToken({
                uniqueId: existingUserByEmail.UniqueId,
                createdTime: existingUserByEmail.CreatedTime
            });
            await setToken(token);
            return NextResponse.json({ message: Messages.LOGIN_SUCCESSFUL, nextURL: request.nextUrl.basePath }, { status: StatusCodes.SUCCESS })
        }

        return NextResponse.json({
            message: Messages.LOGIN_FAILED,
        }, { status: StatusCodes.UNAUTHORIZED })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: error.errors }, { status: StatusCodes.BAD_REQUEST })
        }
        return NextResponse.json({ message: Messages.UNKNOWN_SERVER_ERROR }, { status: StatusCodes.SERVER_ERROR })
    }
}