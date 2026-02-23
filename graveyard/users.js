/* import { response } from "express";

const users = [
  {
    id: 1,
    username: "johndoe",
    password: "password1",
    email: "johndoe@example.com"
  },
  {
    id: 2,
    username: "janedoe",
    password: "password2",
    email: "janedoe@example.com"
  },
  {
    id: 3,
    username: "bobsmith",
    password: "password3",
    email: "bobsmith@example.com"
  }
];


const getUsers = (req, res) => {
  // ÄLÄ IKINÄ LÄHETÄ SALASANOJA HTTP-VASTAUKSESSA!
  // Poistetaan salasanat ennen kuin lähetetään käyttäjät takaisin
  const sanitizedUsers = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, email: undefined };
  });
  res.json(sanitizedUsers);
};

// getUserById

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    delete user.password;
    user.email = undefined;
    res.json({ message: 'User found', user });
  }}

// Put user by id
const putUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const { username, password, email } = req.body;
  if (username) users[userIndex].username = username;
  if (password) users[userIndex].password = password;
  if (email) users[userIndex].email = email;
  const updatedUser = { ...users[userIndex] };
  delete updatedUser.password;
  updatedUser.email = undefined;
  res.json({ message: 'User updated successfully', user: updatedUser });
};

const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const deletedUser = users.splice(userIndex, 1);
  const user = { ...deletedUser[0] };
  delete user.password;
  user.email = undefined;
  res.json({ message: 'User deleted successfully', user });
};

const postUser = (req, res) => {
  const newUser = req.body;
  // Uusilla käyttäjillä tulee olla username, password ja email
  if (!newUser.username || !newUser.password || !newUser.email) {
    return res.status(400).json({ message: 'Bad request: username, password and email are required' });
  }
  console.log('Registering new user:');
  // HUOM: Älä ikinä loggaa käyttäjätietoja tuotantoympäristössä!
  const newId = users[users.length - 1].id + 1;
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjectin
  // ominaisuudet ja lisätään users-taulukkoon loppuun
  users.push({id: newId, ...newUser});
  const responseUser = { username: newUser.username, id: newId };
  console.log("users", users);
  res.status(201).json({ message: 'User registered successfully', user: responseUser });
  }

  const postLogin = (req, res) => {
  const { username, password } = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const userFound = users.find(user => username === user.username);

  if (userFound) {
    if (userFound.password === password) {
      delete userFound.password; // remove password before sending
      return res.json({ message: 'login ok', user: userFound });
    }
    return res.status(403).json({ error: 'invalid password' });
  }

  res.status(404).json({ error: 'user not found' });
};


export { getUsers, postUser, getUserById, putUserById, deleteUserById, postLogin };
 */
