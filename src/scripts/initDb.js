// dbInit.js
import sequelize from '@/db/dbConfig';
import logger from "@/logger";
import {seedUsers} from "@/scripts/UserDataCreator"; // Adjust the path as necessary


async function seedDatabase() {
    try {

        await seedUsers();
        // Your database seeding logic goes here
        // e.g., checking if data exists and seeding if necessary
        logger.info('Seeding completed successfully.');
    } catch (error) {
        logger.error('Error seeding database:', error);
    }
}



export async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
        // Sync all models at once
        await sequelize.sync();
        await seedDatabase();
        logger.info('All models were synchronized successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}
initializeDatabase().then(r => console.log(r)).catch(e => console.error(e))