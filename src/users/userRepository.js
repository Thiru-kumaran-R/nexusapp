import jwt from "jsonwebtoken";
import {serialize} from "cookie";


const JWT_SECRET = process.env.JWT_SECRET; // You should set this in your .env file

export function createUserObject(token) {


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