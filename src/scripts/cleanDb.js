
import sequelize from '@/db/dbConfig';
import logger from "@/logger";
import {cleanUsers} from "@/scripts/UserDataCreator"; // Adjust the path as necessary


async function cleanDatabase() {
    try {

        await cleanUsers();

        logger.info('Cleaning completed successfully.');
    } catch (error) {
        logger.error('Error Cleaning database:', error);
    }
}



export async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
        // Sync all models at once
        await sequelize.sync();
        await cleanDatabase();
        logger.info('All models were synchronized successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}
initializeDatabase().then(r => console.log(r)).catch(e => console.error(e))