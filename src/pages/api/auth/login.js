// pages/api/login.js

import User from "@/users/UserModel";
import logger from "@/logger";
import {createUserObject} from "@/users/userRepository";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // You should set this in your .env file


export default async function handler(req, res) {
    logger.debug("login api called" + req.method);
    if (req.method === 'POST') {

        const { email, password } = req.body;

        try {
            logger.debug("Attempting to find user");
            const user = await User.findByEmailAndPassword(email, password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            logger.debug("User Found");

            const token = jwt.sign(
                {userId: user.id, email: user.email,userType: user.userType, institutionName: user.institutionName, organizationName: user.organizationName},
                JWT_SECRET,
                {expiresIn: '24h'} // Token will expire in 1 hour
            );
            // Create a JWT token
            const serialized = createUserObject(token);

            res.setHeader('Set-Cookie', serialized);

            // If user authentication was successful, return a success response
            res.status(200).json({ message: 'User successfully logged in', user ,token});
        } catch (error) {
            // If there was an error, return an error response
            res.status(500).json({ message: error.message });
        }
    } else {
        // If the request method is not POST, return a method not allowed error
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
