  import promisePool from '../utils/database.js';

  const users = [
  { id: 1, username: 'johndoe', password: 'password1', email: 'johndoe@example.com' },
  { id: 2, username: 'janedoe', password: 'password2', email: 'janedoe@example.com' },
  { id: 3, username: 'bobsmith', password: 'password3', email: 'bobsmith@example.com' },
];

const findUserByUsername = async (username) => {
  return users.find(u => u.username === username) || null;
};

const createUser = async (user) => {
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newId, ...user };
  users.push(newUser);
  return newId;
};

const getAllUsers = async () => users.map(u => ({ ...u }));

const findUserById = async (id) => users.find(u => u.id == id) || null;

const updateUser = async (id, user) => {
  const idx = users.findIndex(u => u.id == id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...user };
  return users[idx];
};

const deleteUser = async (id) => {
  const idx = users.findIndex(u => u.id == id);
  if (idx === -1) return null;
  const [deleted] = users.splice(idx, 1);
  return deleted;
};

export { findUserByUsername, createUser, getAllUsers, findUserById, updateUser, deleteUser };
