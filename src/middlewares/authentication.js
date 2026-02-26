import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Authentication middleware: verifies JWT and attaches the decoded user to `req.user`.
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.warn('Warning: JWT_SECRET is not set in environment; using fallback for development only');
}

// If a valid Authorization header with a Bearer token is present, verify it.
// On success `req.user` will contain the token payload (user info).
// On failure the request is rejected with 401 or 403.
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == undefined) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, SECRET || 'change_this_secret');
    next();
  } catch (error) {
    console.log('token verification failed', error.message);
    res.status(403).send({ message: 'invalid token' });
  }
};

export { authenticateToken };
