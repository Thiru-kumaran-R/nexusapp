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
