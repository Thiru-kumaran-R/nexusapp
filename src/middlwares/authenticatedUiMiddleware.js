import {NextResponse} from "next/server";


export default function authenticatedUiMiddleWare(req) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get('accessToken');



    if (pathname === '/') {
        //console.log("authenticatedUiMiddleWare redirecting to home")
        return NextResponse.redirect(new URL('/welcome', req.url))
    }


    const allowedRoutes =["/welcome"]
    // If the pathname is in the list of allowed routes, continue with the request
    if (allowedRoutes.includes(pathname)) {
       // console.log("authenticatedUiMiddleWare redirecting to path")
        return NextResponse.next();
    }

    return NextResponse.next();


}
