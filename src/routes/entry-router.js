import express from 'express';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handler.js';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter.route('/')
  .get(getEntries)
  .post(
    authenticateToken,
    body('entry_date').trim().isISO8601(),
    body('mood').optional().isLength({ max: 100 }),
    body('weight').optional().isFloat({ min: 0, max: 500 }),
    body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
    body('notes').optional().isLength({ max: 2000 }),
    validationErrorHandler,
    postEntry
  );

entryRouter.route('/:id')
  .get(getEntryById)
  .put(authenticateToken, putEntry)
  .delete(authenticateToken, deleteEntry);

export default entryRouter;
