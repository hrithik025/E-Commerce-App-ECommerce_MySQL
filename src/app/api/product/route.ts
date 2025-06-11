import { ZodError } from "zod";
import { Messages } from "@/server/lib/Messages";
import { StatusCodes } from "@/server/lib/StatusCodes";
import { NextRequest, NextResponse } from "next/server";
import { JSONExtension } from "@/server/lib/JSONExtension";
import { GetProductsForBrowse } from "@/server/entities/queries/Product.query";

export async function POST(request: NextRequest) {
    try {
        const json = await request.json();
        const products = JSONExtension.Serialize(await GetProductsForBrowse());
        return NextResponse.json({ data: products }, { status: StatusCodes.SUCCESS })

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ message: error.errors }, { status: StatusCodes.BAD_REQUEST })
        }
        console.log(error);
        return NextResponse.json({ message: Messages.UNKNOWN_SERVER_ERROR }, { status: StatusCodes.SERVER_ERROR })
    }
}