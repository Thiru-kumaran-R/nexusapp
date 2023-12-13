// pages/_middleware.js
import { NextResponse } from 'next/server';
import anonymousUiMiddleware from './middlwares/anonymous/anonymousUiMiddleware';
import anonymousApiMiddleware from './middlwares/anonymous/anonymousApiMiddleware';
import authenticatedApiMiddleware from './middlwares/authenticated/authenticatedApiMiddleware'
import authenticatedUiMiddleware from './middlwares/authenticated/authenticatedUiMiddleware'
import jwt from 'jsonwebtoken';

export function authenticatedApiMiddleWare(req) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get('accessToken');



    if (pathname === '/') {
        return NextResponse.redirect(new URL('/welcome', req.url))
    }


    const allowedRoutes =["/welcome"]
    // If the pathname is in the list of allowed routes, continue with the request
    if (allowedRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    return NextResponse.next();


}

export function unAuthenticatedApiMiddleWare(req) {

    const { pathname } = req.nextUrl;
    console.log("unAuthenticatedUiMiddleWare pathname" +pathname)

    const allowedRoutes =["/auth/login","/auth/register"]
    // If the pathname is in the list of allowed routes, continue with the request or else return with 401

}

export function apiMiddleware(req) {

    const token = req.cookies.get('accessToken');


    if(token){
        return authenticatedApiMiddleware(req)
    }else {
        return anonymousApiMiddleware(req)
    }
}



export function uiMiddleware(req) {
    const token = req.cookies.get('accessToken');


    // if authenticated handle Authenticated MiddleWare
    if(token){
        return authenticatedUiMiddleware(req)
    }else {
        return anonymousUiMiddleware(req)
    }
}

export function middleware(req) {


        const { pathname } = req.nextUrl;


    if(pathname.startsWith("/api")) {
        return apiMiddleware(req);
    }else {
        return uiMiddleware(req);
    }


}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}