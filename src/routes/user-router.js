import express from 'express';
import {
  getUsers,
  postLogin,
  postUser,
  getUserById,
  putUserById,
  deleteUserById
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

import express from 'express';
import {
  getUsers,
  postLogin,
  postUser,
  getUserById,
  putUserById,
  deleteUserById
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

// Router for user management endpoints
// - GET  /api/users        => list users (passwords removed by controller)
// - POST /api/users        => register a new user
// - POST /api/users/login  => login (legacy route)
// - GET  /api/users/:id    => fetch a single user
// - PUT  /api/users/:id    => update user (protected; must be owner)
// - DELETE /api/users/:id  => delete user
const userRouter = express.Router();

// Users resource endpoints
userRouter.route('/')
// GET all users
.get(getUsers)
// POST new user
.post(postUser);

// POST user login
userRouter.post('/login', postLogin);

// Get user by id
userRouter.get('/:id', getUserById);

// Put user by id (protected)
userRouter.put('/:id', authenticateToken, putUserById);

// Delete user by id
userRouter.delete('/:id', deleteUserById);

export default userRouter;
