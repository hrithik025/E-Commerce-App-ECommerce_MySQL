import { ZodError } from "zod";
import { Messages } from "@/server/lib/Messages";
import { StatusCodes } from "@/server/lib/StatusCodes";
import { NextRequest, NextResponse } from "next/server";
import { GetProductCategories } from "@/server/entities/queries";

export async function POST(request: NextRequest) {
    try {
        const json = await request.json();
        // const loginData = LoginFormSchema.parse(json);
        const productCategories = await GetProductCategories();
        return NextResponse.json({ data: productCategories }, { status: StatusCodes.SUCCESS })

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: error.errors }, { status: StatusCodes.BAD_REQUEST })
        }
        return NextResponse.json({ message: Messages.UNKNOWN_SERVER_ERROR }, { status: StatusCodes.SERVER_ERROR })
    }
}