const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(cors());
app.use(bodyParser.json());

db.serialize(() => {
  db.run("CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)");
});

app.get('/notes', (req, res) => {
  db.all("SELECT * FROM notes", (err, rows) => res.json(rows));
});

app.post('/notes', (req, res) => {
  const { content } = req.body;
  db.run("INSERT INTO notes (content) VALUES (?)", [content], function(err) {
    res.json({ id: this.lastID, content });
  });
});

app.delete('/notes/:id', (req, res) => {
  db.run("DELETE FROM notes WHERE id = ?", [req.params.id], function(err) {
    res.json({ deleted: this.changes });
  });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
