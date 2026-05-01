const db = require('../db');
const bcrypt = require('bcrypt');

// REGISTER
exports.register = (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });

      res.json({ message: 'User registered' });
    }
  );
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = results[0];

      const valid = bcrypt.compareSync(password, user.password);

      if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.session.userId = user.id;

      res.json({ message: 'Login successful' });
    }
  );
};

// LOGOUT
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};