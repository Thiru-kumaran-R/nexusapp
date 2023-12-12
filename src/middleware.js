// pages/_middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    try {
        const token = req.cookies.token; // Assuming the JWT token is stored in a cookie
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach user info to the request
            req.user = decoded;
        }
    } catch (error) {
        // Handle error, possibly set req.user to null or handle invalid token
        req.user = null;
    }

    return NextResponse.next();
}
