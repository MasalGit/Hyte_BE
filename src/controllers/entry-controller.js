import {listAllEntries, findEntryById, addEntry, updateEntry, deleteEntry as deleteEntryModel} from "../models/entry-model.js";

const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res, next) => {
  try {
    const token_user_id = req.user?.id ?? req.user?.user_id;
    const { entry_date, mood, weight, sleep_hours, notes } = req.body;
    const user_id = token_user_id ?? req.body.user_id;

    if (!user_id) {
      const err = new Error('user_id missing');
      err.status = 401;
      return next(err);
    }

    if (!(mood || weight || sleep_hours || notes)) {
      const err = new Error('entry must contain at least one of mood, weight, sleep_hours or notes');
      err.status = 400;
      return next(err);
    }

    const result = await addEntry({ user_id, entry_date, mood, weight, sleep_hours, notes });
    if (result.entry_id) {
      res.status(201).json({ message: 'New entry added.', ...result });
    } else {
      const err = new Error(result.error || 'insert failed');
      err.status = 500;
      return next(err);
    }
  } catch (e) {
    next(e);
  }
};

const putEntry = async (req, res) => {
  const token_user_id = req.user?.id ?? req.user?.user_id;
  const entryId = req.params.id;

  const entry = await findEntryById(entryId);
  if (!entry) return res.sendStatus(404);
  if (!token_user_id || token_user_id.toString() !== entry.user_id.toString()) {
    return res.status(403).json({ error: 403, message: 'forbidden' });
  }

  const updated = await updateEntry(entryId, req.body);
  if (!updated) return res.status(500).json({ error: 'update failed' });
  res.json({ message: 'entry updated', entry: updated });
};

const deleteEntry = async (req, res) => {
  const token_user_id = req.user?.id ?? req.user?.user_id;
  const entryId = req.params.id;

  const entry = await findEntryById(entryId);
  if (!entry) return res.sendStatus(404);
  if (!token_user_id || token_user_id.toString() !== entry.user_id.toString()) {
    return res.status(403).json({ error: 403, message: 'forbidden' });
  }

  const removed = await deleteEntryModel(entryId);
  if (!removed) return res.status(500).json({ error: 'delete failed' });
  res.json({ message: 'entry deleted', entry: removed });
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
