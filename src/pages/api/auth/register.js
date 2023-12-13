// pages/api/register.js

import User from "@/users/UserModel";
import logger from "@/logger";
import {createUserObject} from "@/users/userRepository";
// Import your user service or database operations here
// For example, import { createUser } from '../../services/userService';

export default async function handler(req, res) {
    logger.debug("register api called" + req.method);
    if (req.method === 'POST') {
        // Extract user data from the request body
        const { email, password, userType, institutionName, organizationName } = req.body;

        try {


            const userData = { email, password, userType, institutionName, organizationName };
            logger.debug("Attempting to create user");
            const user = await User.insert(userData);

            const serialized = createUserObject(user);

            res.setHeader('Set-Cookie', serialized);
            logger.debug("User Created");
            // If user creation was successful, return a success response
            res.status(200).json({ message: 'User successfully registered', user });
        } catch (error) {
            logger.debug("Error Creating User");
            logger.debug(error);
            // If there was an error creating the user, return an error response
            res.status(500).json({ message: error.message });
        }
    } else {
        // If the request method is not POST, return a method not allowed error
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
