const express = require('express');
const session = require('express-session');
const db = require('./db'); // connects database

const app = express();

app.use(express.json());

app.use(session({
    secret: 'journal-secret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.json({ message: 'Journal API is running' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});