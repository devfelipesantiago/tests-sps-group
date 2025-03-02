const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function connection() {
  return open({
    filename: './src/db/database.db',
    driver: sqlite3.Database,
  });
}

async function initialize() {
  const db = await connection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      type TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);
}
module.exports = {
  connection,
  initialize,
};
