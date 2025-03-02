const { connection } = require('../config/database.js');

const insert = async ({ name, email, type, password }) => {
  const conn = await connection();
  const user = await conn.run(
    'INSERT INTO users (name, email, type, password) VALUES (?, ?, ?, ?)',
    [name, email, type, password]
  );
  return user;
};

const update = async (data, id) => {
  const conn = await connection();
  const user = await conn.run(
    'UPDATE users SET name = ?, email = ?, type = ?, password = ? WHERE id = ?',
    [data.name, data.email, data.type, data.password, id]
  );
  return user;
};

const remove = async (id) => {
  const conn = await connection();
  await conn.get('DELETE FROM users WHERE id = ?', [id]);
};

const findAll = async () => {
  const conn = await connection();
  const users = await conn.all('SELECT * FROM users');
  return users;
};

const findById = async (id) => {
  const conn = await connection();
  const user = await conn.get('SELECT * FROM users WHERE id = ?', [id]);
  return user;
};

const findByEmail = async (email) => {
  const conn = await connection();
  const user = await conn.get('SELECT * FROM users WHERE email = ?', [email]);
  return user;
};

module.exports = {
  insert,
  update,
  remove,
  findAll,
  findById,
  findByEmail,
};
