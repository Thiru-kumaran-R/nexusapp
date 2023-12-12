// dbInit.js
import sequelize from './dbConfig';
import User from '@/users/UserModel'; // Adjust the path as necessary


async function seedDatabase() {
    try {

        // Your database seeding logic goes here
        // e.g., checking if data exists and seeding if necessary
        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}



async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all models at once
        await sequelize.sync();
        await seedDatabase();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default initializeDatabase;
