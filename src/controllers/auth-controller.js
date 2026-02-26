import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername } from '../models/user-model.js';
import 'dotenv/config';

// Controller for authentication-related endpoints (login, token checks)

// POST /api/auth/login
// Validate username/password, return a signed JWT and user data on success.
const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(400).json({ error: 'username and password required' });

	const user = await findUserByUsername(username);
	if (!user) return res.status(404).json({ error: 'user not found' });

	const match = await bcrypt.compare(password, user.password);
	if (!match) return res.status(403).json({ error: 'invalid password' });

	const payload = { id: user.id, username: user.username, user_level: user.user_level };
	const token = jwt.sign(payload, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '1h' });

	delete user.password;
	res.json({ message: 'login ok', token, user });
};

// GET /api/auth/me
// Return the user object attached to the request by `authenticateToken`.
// Useful for validating a stored client token and fetching user info.
const getMe = async (req, res) => {
	console.log('getMe', req.user);
	if (req.user) {
		res.json({ message: 'token ok', user: req.user });
	} else {
		res.sendStatus(401);
	}
};

export { login, getMe };
