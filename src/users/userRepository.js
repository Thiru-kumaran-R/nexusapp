import jwt from "jsonwebtoken";
import {serialize} from "cookie";


const JWT_SECRET = process.env.JWT_SECRET; // You should set this in your .env file

export function createUserObject(user) {
    const token = jwt.sign(
        {userId: user.id, email: user.email,userType: user.userType, institutionName: user.institutionName, organizationName: user.organizationName},
        JWT_SECRET,
        {expiresIn: '24h'} // Token will expire in 1 hour
    );

    // Set the token in a cookie
    const serialized = serialize('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 24, // 1 hour
        path: '/',
    });
    return serialized;
}