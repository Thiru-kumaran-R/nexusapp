import {NextResponse} from "next/server";

export default function anonymousApiMiddleWare(req) {

    const { pathname } = req.nextUrl;
    console.log("unAuthenticatedApiMiddleWare pathname" +pathname)



    return NextResponse.next();
}