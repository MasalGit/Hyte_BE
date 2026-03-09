// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../utils/database.js';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    // sama sijoituslause perinteisemmin:
    //const result = await promisePool.query('SELECT * FROM DiaryEntries');
    //console.log('sql query result', result);
    //const rows = result[0];

    //console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    // prepared statement
    const [rows] = await promisePool.execute('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);

    // turvaton tapa, mahdollistaa sql-injektiohaavoittuvuuden:
    //const [rows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE entry_id =' + id);

    //console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  if (user_id === undefined) {
    return { error: 'user_id is required' };
  }
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  // convert undefined to null so SQL drivers receive NULL instead of undefined
  let params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  params = params.map((v) => (v === undefined ? null : v));
  try {
    const result = await promisePool.execute(sql, params);
    //console.log('insert result', result);
    return {entry_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// Update an entry by id. Returns the updated entry or null if not found.
const updateEntry = async (id, entry) => {
  const existing = await findEntryById(id);
  if (!existing) return null;

  const fields = [];
  const params = [];
  if (entry.entry_date !== undefined) { fields.push('entry_date = ?'); params.push(entry.entry_date); }
  if (entry.mood !== undefined) { fields.push('mood = ?'); params.push(entry.mood); }
  if (entry.weight !== undefined) { fields.push('weight = ?'); params.push(entry.weight); }
  if (entry.sleep_hours !== undefined) { fields.push('sleep_hours = ?'); params.push(entry.sleep_hours); }
  if (entry.notes !== undefined) { fields.push('notes = ?'); params.push(entry.notes); }

  if (fields.length === 0) return existing;

  const sql = `UPDATE DiaryEntries SET ${fields.join(', ')} WHERE entry_id = ?`;
  params.push(id);
  await promisePool.execute(sql, params);
  return findEntryById(id);
};

// Delete an entry by id. Returns the deleted record or null if not found.
const deleteEntry = async (id) => {
  const existing = await findEntryById(id);
  if (!existing) return null;
  const sql = 'DELETE FROM DiaryEntries WHERE entry_id = ?';
  await promisePool.execute(sql, [id]);
  return existing;
};

export {listAllEntries, findEntryById, addEntry, updateEntry, deleteEntry};
