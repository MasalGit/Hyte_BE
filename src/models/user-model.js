import promisePool from '../utils/database.js';

// Find a user by username. Returns a single user object or null.
const findUserByUsername = async (username) => {
  const sql = 'SELECT user_id AS id, username, password, email, created_at, user_level FROM Users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0] || null;
};

// Insert a new user and return the new id.
const createUser = async (user) => {
  const { username, password, email } = user;
  const sql = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
  const [result] = await promisePool.execute(sql, [username, password, email]);
  return result.insertId;
};

// Return all users (includes password field; callers should strip it).
const getAllUsers = async () => {
  const sql = 'SELECT user_id AS id, username, password, email, created_at, user_level FROM Users';
  const [rows] = await promisePool.execute(sql);
  return rows;
};

// Find a user by their numeric id.
const findUserById = async (id) => {
  const sql = 'SELECT user_id AS id, username, password, email, created_at, user_level FROM Users WHERE user_id = ?';
  const [rows] = await promisePool.execute(sql, [id]);
  return rows[0] || null;
};

// Update user fields for a given id and return the updated user.
const updateUser = async (id, user) => {
  const existing = await findUserById(id);
  if (!existing) return null;

  const fields = [];
  const params = [];
  if (user.username !== undefined) { fields.push('username = ?'); params.push(user.username); }
  if (user.password !== undefined) { fields.push('password = ?'); params.push(user.password); }
  if (user.email !== undefined) { fields.push('email = ?'); params.push(user.email); }

  if (fields.length === 0) return existing;

  const sql = `UPDATE Users SET ${fields.join(', ')} WHERE user_id = ?`;
  params.push(id);
  await promisePool.execute(sql, params);
  return findUserById(id);
};

// Add a new user (used by controllers). Returns an object with user_id or an error.
const addUser = async (user) => {
  const {username, password, email} = user;
  if (username === undefined || password === undefined || email === undefined) {
    return { error: 'missing required user fields' };
  }
  const sql = `INSERT INTO Users (username, password, email)
               VALUES (?, ?, ?)`;
  const params = [username, password, email];
  try {
    const result = await promisePool.execute(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

// Delete a user and return the deleted record (or null if not found).
const deleteUser = async (id) => {
  const existing = await findUserById(id);
  if (!existing) return null;
  const sql = 'DELETE FROM Users WHERE user_id = ?';
  await promisePool.execute(sql, [id]);
  return existing;
};

export { findUserByUsername, createUser, getAllUsers, findUserById, updateUser, deleteUser, addUser };
