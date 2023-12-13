/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
/** @type {import('./src/db/dbInit.js').initializeDatabase} */
//console.log("Executes at server startup",initializeDatabase)

// module.exports = nextConfig

let i =1
module.exports = async (phase, { defaultConfig }) => {

  // /**
  //  * @type {import { initializeDatabase } from "./src/db/dbInit.js"}
  //  */
  // initializeDatabase().then(r => console.log(r)).catch(e => console.error(e))
  console.log("Executes at exports server startup" + (i++))
  return nextConfig
}