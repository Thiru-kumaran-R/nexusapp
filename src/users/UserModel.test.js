import User, {encryptPassword} from './UserModel'; // Adjust the path as necessary
import sequelize from '@/db/dbConfig'; // Adjust the import based on your project structure
import {expect, test} from '@jest/globals';
import logger from "@/logger";


describe('User Model', () => {
    beforeAll(async () => {
    //   await sequelize.sync({ force: true }); // This will recreate the test database
    });

    afterAll(async () => {
       await sequelize.close(); // Close the database connection at the end of tests
    });

    test('Create User', async () => {
        const userData = { email: 'test@example.com', password: 'password123', userType: 'admin' };
        const user = await User.insert(userData);
        expect(user.email).toBe(userData.email);
        expect(user.userType).toBe(userData.userType);
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
    test('findByEmailAndPassword check', async () => {
        logger.debug("findByEmailAndPassword time");
        const res  = await User.findByEmailAndPassword('test@example.com',"password123");
        logger.debug(JSON.stringify(res));
        expect(res.email).toBe('test@example.com');
        logger.debug(res);
    });




});
