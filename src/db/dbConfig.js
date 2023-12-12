// db.js

// db.js
import { Sequelize } from 'sequelize';
import pg from "pg";

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    dialectModule: pg, // I've added this.
    port: process.env.PG_PORT,
    pool: {
        max: 10, // Example configuration
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize;
