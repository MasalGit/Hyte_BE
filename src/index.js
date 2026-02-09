import express from 'express';
import cors from 'cors';
import {deleteItemById, getItemById, getItems, postNewItem, putItemById} from './items.js';
import { getUsers, postUser, getUserById, putUserById, deleteUserById, postLogin } from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// enable CORS requests
app.use(cors());

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Endpoints for 'items' resource
// Get all items
app.get('/api/items', getItems);
// Get item based on id
app.get('/api/items/:id', getItemById);
// PUT route for items
app.put('/api/items/:id', putItemById);
// DELETE route for items
app.delete('/api/items/:id', deleteItemById);
// Add new item
app.post('/api/items', postNewItem);
// Users eresouce endpoints
app.get('/api/users', getUsers);
// POST new user
app.post('/api/users', postUser);
// Get user by ID
app.get('/api/users/:id', getUserById);
// Put user by ID
app.put('/api/users/:id', putUserById);
// Delete user by ID
app.delete('/api/users/:id', deleteUserById);
// Post user login
app.post('/api/users/login', postLogin);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
