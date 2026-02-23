import promisePool from '../utils/database.js';


// TODO: lisää modelit ja muokkaa kontrollerit reiteille:
// GET /api/users - list all users
// GET /api/users/:id - get user by id
// POST /api/users - add a new user

// Huom: virheenkäsittely puuttuu
const findUserByUsername = async (username) => {
  const sql = 'SELECT * FROM Users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0];
};

const createUser = async (user) => {
  const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
  const [result] = await promisePool.execute(sql, [user.username, user.email, user.password]);
  return result;
};

const getAllUsers = async () => {
  const sql = 'SELECT * FROM Users';
  const [rows] = await promisePool.execute(sql);
  return rows;
};

const findUserById = async (id) => {
  const sql = 'SELECT * FROM Users WHERE id = ?';
  const [rows] = await promisePool.execute(sql, [id]);
  return rows[0];
};

const updateUser = async (id, user) => {
  const sql = 'UPDATE Users SET username=?, email=?, password=? WHERE id=?';
  const [result] = await promisePool.execute(sql, [user.username, user.email, user.password, id]);
  return result;
};

const deleteUser = async (id) => {
  const sql = 'DELETE FROM Users WHERE id=?';
  const [result] = await promisePool.execute(sql, [id]);
  return result;
};

export {findUserByUsername, createUser, getAllUsers, findUserById, updateUser, deleteUser};
