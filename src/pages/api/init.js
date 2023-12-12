// pages/api/seed.js

import initializeDatabase from "@/db/dbInit";

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Trigger the seeding process
        initializeDatabase()
            .then(() => {
                console.log('Seeding process started');
            })
            .catch((error) => {
                console.error('Error during seeding:', error);
            });

        // Immediately respond to the client
        res.status(202).json({ message: 'Seeding process initiated' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
// /⨯ Error: Please install pg package manually at ConnectionManager._loadDialectModule (/var/task/node_modules/sequelize/lib/dialects/abstract/connection-manager.js:55:15) at new ConnectionManager (/var/task/node_modules/sequelize/lib/dialects/postgres/connection-manager.js:15:24) at new PostgresDialect (/var/task/node_modules/sequelize/lib/dialects/postgres/index.js:13:30) at new Sequelize (/var/task/node_modules/sequelize/lib/sequelize.js:194:20) at /var/task/.next/server/pages/api/init.js:1:920 Error: Please install pg package manually at ConnectionManager._loadDialectModule (/var/task/node_modules/sequelize/lib/dialects/abstract/connection-manager.js:55:15) at new ConnectionManager (/var/task/node_modules/sequelize/lib/dialects/postgres/connection-manager.js:15:24) at new PostgresDialect (/var/task/node_modules/sequelize/lib/dialects/postgres/index.js:13:30) at new Sequelize (/var/task/node_modules/sequelize/lib/sequelize.js:194:20) at /var/task/.next/server/pages/api/init.js:1:920 Error: Runtime exited with error: exit status 1 Runtime.ExitError