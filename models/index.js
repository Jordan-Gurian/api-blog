const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 
const conn = process.env.DB_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(conn);
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Expose the connection
module.exports = db;