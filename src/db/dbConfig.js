import {Sequelize} from 'sequelize';
import pg from "pg";
import logger from "@/logger";


const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    dialectModule: pg,
    port: process.env.PG_PORT,
    logging: (query)=> logger.debug(query),
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

 logger.debug('DB connection established successfully to ' + process.env.PG_HOST + "@" + process.env.PG_DATABASE );

export default sequelize;
