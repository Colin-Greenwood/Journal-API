const db = require('../db');

// CREATE
exports.createNote = (req, res) => {
  const { title, content } = req.body;

  db.query(
    'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
    [req.session.userId, title, content],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });

      res.json({ id: result.insertId, title, content });
    }
  );
};

// READ ALL (ONLY USER'S NOTES)
exports.getNotes = (req, res) => {
  db.query(
    'SELECT * FROM notes WHERE user_id = ?',
    [req.session.userId],
    (err, results) => {
      if (err) return res.status(400).json({ error: err.message });

      res.json(results);
    }
  );
};

// READ ONE
exports.getNote = (req, res) => {
  db.query(
    'SELECT * FROM notes WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }

      res.json(results[0]);
    }
  );
};

// UPDATE
exports.updateNote = (req, res) => {
  const { title, content } = req.body;

  db.query(
    'UPDATE notes SET title = ?, content = ? WHERE id = ?',
    [title, content, req.params.id],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });

      res.json({ message: 'Updated' });
    }
  );
};

// DELETE
exports.deleteNote = (req, res) => {
  db.query(
    'DELETE FROM notes WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });

      res.json({ message: 'Deleted' });
    }
  );
};