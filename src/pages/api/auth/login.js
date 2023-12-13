// pages/api/login.js

import User from "@/users/UserModel";
import logger from "@/logger";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import {createUserObject} from "@/users/userRepository";



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

            // Create a JWT token
            const serialized = createUserObject(user);

            res.setHeader('Set-Cookie', serialized);

            // If user authentication was successful, return a success response
            res.status(200).json({ message: 'User successfully logged in', user });
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
