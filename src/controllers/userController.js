// HUOM: mokkidata on poistettu modelista
import {
  findUserByUsername,
  getAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser
} from '../models/user-model.js';


// TODO: lisää tietokantafunktiot user modeliin
// ja käytä niitä täällä


// Refaktoroi tietokantafunktiolle
const getUsers = async (req, response) => {
  const users = await getAllUsers();

  // ÄLÄ IKINÄ lähetä salasanoja HTTP-vastauksessa
  for (let i = 0; i < users.length; i++) {
    delete users[i].password;
  }

  response.json(users);
};


// GetUserById
const getUserById = async (req, response) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    return response.status(404).json({error: 'user not found'});
  }

  delete user.password;
  response.json(user);
};


// PutUserById
const putUserById = async (req, response) => {
  await updateUser(req.params.id, req.body);
  response.json({message: 'user updated'});
};


// DeleteUserById
const deleteUserById = async (req, response) => {
  await deleteUser(req.params.id);
  response.json({message: 'user deleted'});
};


// Käyttäjän lisäys (rekisteröityminen)
const postUser = async (pyynto, vastaus) => {
  const newUser = pyynto.body;

  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }

  const newId = await createUser(newUser);

  vastaus.status(201).json({message: 'new user added', user_id: newId});
};


// Tietokantaversio valmis
const postLogin = async (req, res) => {
  const {username, password} = req.body;

  const user = await findUserByUsername(username);

  if (user) {
    if (user.password === password) {
      delete user.password;
      return res.json({message: 'login ok', user: user});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};


export {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
  postLogin
};
