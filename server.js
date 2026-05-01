const express = require('express');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));