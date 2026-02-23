import promisePool from '../utils/database.js';

const findUserByUsername = async (username) => {
  const sql = 'SELECT * FROM Users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0] || null;
};

const createUser = async (user) => {
  const { username, password, email } = user;
  const sql = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
  const [result] = await promisePool.execute(sql, [username, password, email]);
  return result.insertId;
};

const getAllUsers = async () => {
  const sql = 'SELECT * FROM Users';
  const [rows] = await promisePool.execute(sql);
  return rows;
};

const findUserById = async (id) => {
  const sql = 'SELECT * FROM Users WHERE id = ?';
  const [rows] = await promisePool.execute(sql, [id]);
  return rows[0] || null;
};

const updateUser = async (id, user) => {
  const existing = await findUserById(id);
  if (!existing) return null;

  const fields = [];
  const params = [];
  if (user.username !== undefined) { fields.push('username = ?'); params.push(user.username); }
  if (user.password !== undefined) { fields.push('password = ?'); params.push(user.password); }
  if (user.email !== undefined) { fields.push('email = ?'); params.push(user.email); }

  if (fields.length === 0) return existing;

  const sql = `UPDATE Users SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);
  await promisePool.execute(sql, params);
  return findUserById(id);
};

const deleteUser = async (id) => {
  const existing = await findUserById(id);
  if (!existing) return null;
  const sql = 'DELETE FROM Users WHERE id = ?';
  await promisePool.execute(sql, [id]);
  return existing;
};

export { findUserByUsername, createUser, getAllUsers, findUserById, updateUser, deleteUser };
