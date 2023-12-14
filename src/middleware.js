import anonymousUiMiddleware from './middlwares/anonymousUiMiddleware';
import authenticatedUiMiddleware from './middlwares/authenticatedUiMiddleware'

export function middleware(req) {


        const { pathname } = req.nextUrl;

    const token = req.cookies.get('accessToken');


    if(token){
        return authenticatedUiMiddleware(req)
    }else {
        return anonymousUiMiddleware(req)

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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}