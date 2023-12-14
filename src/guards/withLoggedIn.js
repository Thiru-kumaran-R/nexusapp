import {verifyToken} from "@/shared/jwtService";

// This is your higher-order function
export default function withLoggedIn(gssp) {
    return async (context) => {
        const { req, res } = context;
        const token = req.cookies.accessToken;

        // Default redirect object for unauthorized cases
        const redirectToLogin = {
            redirect: {
                destination: '/auth/login',
                permanent: false

            },
        };
        const clearAccessTokenCookie = () => {
            const cookie = serialize('accessToken', '', {
                maxAge: -1, // Set cookie to expire immediately
                path: '/',
            });

            res.setHeader('Set-Cookie', cookie);
        };

        // Verify JWT token
        try {
            if (!token) throw new Error("No token found");
          const response = await  verifyToken(token)

            console.log(response)


            // If the token is valid, call the passed gssp function
            return await gssp(context);
        } catch (error) {
            // If token verification fails, redirect to login
            console.error('JWT verification failed:', error);

            clearAccessTokenCookie();

            // Redirect to login for page requests
            return redirectToLogin;
        }
    };
}
