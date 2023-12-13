import {NextResponse} from "next/server";

export default function anonymousUiMiddleWare(req) {

    const { pathname } = req.nextUrl;
    console.log("unAuthenticatedUiMiddleWare pathname" +pathname)

    const allowedRoutes =["/auth/login","/auth/register"]
    // If the pathname is in the list of allowed routes, continue with the request
    if (allowedRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // If the pathname is not in the list, redirect to the login page
    return NextResponse.redirect(new URL('/auth/login', req.url))
}