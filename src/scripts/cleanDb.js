
import sequelize from '@/db/dbConfig';
import logger from "@/logger";
import {cleanUsers} from "@/scripts/UserDataCreator"; // Adjust the path as necessary






export async function cleanDatabase() {
    try {
        console.log("initializing database")
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
        // Sync all models at once
        await sequelize.sync();
        await cleanUsers();

        logger.info('Cleaning completed successfully.');
        logger.info('All models were synchronized successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}
cleanDatabase().then(r => console.log(r)).catch(e => console.error(e))