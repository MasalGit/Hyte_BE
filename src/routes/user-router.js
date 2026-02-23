import express from 'express';
import {
  getUsers,
  postLogin,
  postUser,
  getUserById,
  putUserById,
  deleteUserById
} from '../controllers/user-controller.js';

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

// Put user by id
userRouter.put('/:id', putUserById);

// Delete user by id
userRouter.delete('/:id', deleteUserById);

export default userRouter;
