import express from 'express';

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());

let items = [
  {id: 1, name: '1'},
  {id: 2, name: '2'},
];

app.get('/items', (req, res) => {
  res.status(200).json(items);
});

app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    res.sendStatus(404);
    return;
  }

  res.status(200).json(item);
});

app.post('/items', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({error: 'Name is required'});
    return;
  }

  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    res.sendStatus(404);
    return;
  }

  item.name = req.body.name || item.name;
  res.status(200).json(item);
});

app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    res.sendStatus(404);
    return;
  }

  items.splice(index, 1);
  res.sendStatus(204);
});

app.use((req, res) => {
  res.status(404).json({error: 'Resource not found'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
