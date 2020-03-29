const express = require('express');
const app = express();
const port = 5000;

// Khoi tao database
const db = require('./db');
db.defaults({ users: [] }).write();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server da duoc khoi tao tai cong ${port}!`));