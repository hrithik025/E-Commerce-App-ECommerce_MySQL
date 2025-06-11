import { NextRequest, NextResponse } from "next/server";
import { Messages } from "@/server/lib/Messages";
import { StatusCodes } from "@/server/lib/StatusCodes";
import { cookies } from "next/headers";
import { RefreshToken, VerifyToken } from "@/server/lib/Authenticator";
import { LogoutUser } from "@/server/entities/actions";

export async function getToken(key: string) {
    const cookiesObject = await cookies();
    return cookiesObject.get(key)?.value
}

export async function setToken(token: string) {
    const cookiesObject = await cookies();
    cookiesObject.set("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/"
    });
}

export async function deleteToken(key: string) {
    const cookiesObject = await cookies();
    cookiesObject.delete(key);
}

async function handleAPICalls(pathname: string, req: NextRequest, requestHeaders: Headers) {
    if (pathname.includes("/api")) {
        if (req.method == "POST") {
            try {
                const json = await req.json()
                return NextResponse.next()
            } catch (error) {
                if (error instanceof SyntaxError) {
                    return NextResponse.json({ message: Messages.SYNTAX_ERROR }, { status: StatusCodes.BAD_REQUEST })
                }
            }
        }
    }
}

function getDefaultHeaders(req: NextRequest): Headers {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', req.nextUrl.pathname);
    requestHeaders.set('x-searchParams', req.nextUrl.searchParams.toString());
    return requestHeaders;
}

export async function middleware(req: NextRequest) {
    const requestHeaders = getDefaultHeaders(req);

    const authToken: string | undefined = await getToken("authToken");
    const isAuthenticated: boolean = authToken !== undefined && await VerifyToken(authToken);

    const { pathname } = req.nextUrl;
    const excludedRoutes: string[] = ["/_next", "/favicon.ico", "/api"]

    if (isAuthenticated && authToken) {
        const newAuthToken = await RefreshToken(authToken);
        if (authToken !== newAuthToken) {
            setToken(newAuthToken);
        }
    }

    if (pathname === "/logout") {
        await deleteToken("authToken");
    }


    if (isAuthenticated || excludedRoutes.find(route => pathname.includes(route)) !== undefined) {
        await handleAPICalls(pathname, req, requestHeaders);
        if (isAuthenticated && (pathname === "/login" || pathname === "/signup"))
            return NextResponse.redirect(new URL("/", req.url))
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }

    if (pathname !== "/login" && pathname !== "/signup") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

}