import bcrypt from 'bcryptjs';
import {
  findUserByUsername,
  getAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  addUser
} from '../models/user-model.js';


// TODO: lisää tietokantafunktiot user modeliin
// ja käytä niitä täällä


// Controller for user resource endpoints (list, create, update, delete, login)

// GET /api/users
// Return a list of users without passwords.
const getUsers = async (req, response) => {
  const users = await getAllUsers();

  // ÄLÄ IKINÄ lähetä salasanoja HTTP-vastauksessa
  for (let i = 0; i < users.length; i++) {
    delete users[i].password;
  }

  response.json(users);
};


// GET /api/users/:id
// Fetch a single user by id and remove the password field before responding.
const getUserById = async (req, response) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    return response.status(404).json({error: 'user not found'});
  }

  delete user.password;
  response.json(user);
};


// PUT /api/users/:id
// Update a user's data. Only the authenticated user may update their own record.
const putUserById = async (req, response) => {
  const token_user_id = req.user?.id ?? req.user?.user_id;
  const user_id = req.params.id;

  if (!token_user_id || token_user_id.toString() !== user_id.toString()) {
    return response.status(403).json({ error: 403, message: 'forbidden' });
  }

  await updateUser(user_id, req.body);
  response.json({ message: 'user updated' });
};


// DELETE /api/users/:id
// Remove a user by id.
const deleteUserById = async (req, response) => {
  await deleteUser(req.params.id);
  response.json({ message: 'user deleted' });
};


// POST /api/users
// Register a new user: validate fields, hash the password, insert into DB.
const postUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    if (!(newUser.username && newUser.password && newUser.email)) {
      const err = new Error('required fields missing');
      err.status = 400;
      return next(err);
    }

    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;
    const newUserId = await addUser(newUser);
    if (!newUserId || newUserId.error) {
      const err = new Error('insert failed');
      err.status = 500;
      return next(err);
    }
    res.status(201).json({message: 'new user added', user_id: newUserId});
  } catch (e) {
    next(e);
  }
};


// POST /api/users/login
// Legacy login handler for user routes (checks username/password and returns user data).
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // Haetaan käyttäjää tietokannasta username-kentän perusteella
  const user = await findUserByUsername(username);
  // Jos asiakkaalta tullut salasana vastaa tietokannasta haetun käyttäjän hashattua salasanaa, login onnistuu
  if (user) {
    if (await bcrypt.compare(password, user.password)) {


      delete user.password;
      return res.json({message: 'login ok', user: user});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};


export { getUsers, getUserById, postUser, putUserById, deleteUserById, postLogin};
