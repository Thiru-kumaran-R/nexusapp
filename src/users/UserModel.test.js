import User, {encryptPassword} from './UserModel'; // Adjust the path as necessary
import sequelize from '@/db/dbConfig'; // Adjust the import based on your project structure
import bcrypt from 'bcryptjs';
import {expect, jest, test} from '@jest/globals';
import logger from "@/logger";




describe('User Model', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // This will recreate the test database
    });

    afterAll(async () => {
       await sequelize.close(); // Close the database connection at the end of tests
    });

    test('Create User', async () => {
        const userData = { email: 'test@example.com', password: 'password123', usertype: 'admin' };
        const user = await User.insert(userData);
        expect(user.email).toBe(userData.email);
        expect(user.usertype).toBe(userData.usertype);
        expect(user.password).not.toBe(userData.password); // The password should be hashed
    });

    test('Find User by Email', async () => {
        const email = 'test@example.com';
        const user = await User.findByEmail(email);
        expect(user.email).toBe(email);
    });


    test('bcrypt time', async () => {
        logger.debug("bcrypt time");
        const res  = await encryptPassword("password123");
        logger.debug(res);
    });




});
