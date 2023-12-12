//
// import dotenv from 'dotenv'
// dotenv.config({ path: '.env.test' });
// //import ('dotenv').config({ path: '.env.test' });
// //require('dotenv').config({ path: '.env.test' });


// testSetup.js
// const dotenv = require('dotenv');
// dotenv.config({ path: '.env.test' });


import dotenv from 'dotenv';
// dotenv.config({ path: '.env.test' });
dotenv.config({ path: '.env.prod' });

console.log('process.env.NODE_ENV', process.env.PG_HOST);