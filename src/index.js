import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import itemRouter from './routes/item-router.js';
import userRouter from './routes/user-router.js';
import requestLogger from './middlewares/logger.js';
import entryRouter from './routes/entry-router.js';
import authRouter from './routes/auth-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// enable CORS requests
app.use(cors());

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// request logging middleware
app.use(requestLogger);

// API endpoints for diary entries
app.use('/api/entries', entryRouter);

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Endpoints for 'items' resource
// Mount routers for items and users
app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
// Authentication endpoints
app.use('/api/auth', authRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
