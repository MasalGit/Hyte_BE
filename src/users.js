import { response } from "express";

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

// TODO: getUserById

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

const postUser = (req, res) => {
  const newUser = req.body;
  console.log('Registering new user:');
  const newId = users[users.length - 1].id + 1;
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjectin
  // ominaisuudet ja lisätään users-taulukkoon loppuun
  users.push({id: newId, ...newUser});
  delete newUser.password;
  newUser.email = undefined;
  console.log("users", users);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
  }

export { getUsers, postUser, getUserById };
