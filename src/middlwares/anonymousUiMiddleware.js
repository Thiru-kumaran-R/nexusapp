import {NextResponse} from "next/server";

export default function anonymousUiMiddleWare(req) {

    const { pathname } = req.nextUrl;
    console.log("unAuthenticatedUiMiddleWare pathname" +pathname)

    // List down all tyhe routes where anonymous user can go
    const allowedRoutes =["/auth/login","/auth/register"]

    if (allowedRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // If the pathname is not in the list, redirect to the login page
    return NextResponse.redirect(new URL('/auth/login', req.url))
}