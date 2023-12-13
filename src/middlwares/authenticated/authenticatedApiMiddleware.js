import {NextResponse} from "next/server";


export default function authenticatedApiMiddleWare(req) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get('accessToken');

console.log("authenticatedApiMiddleWare")
    return NextResponse.next();


}
