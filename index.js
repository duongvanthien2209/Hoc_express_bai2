const express = require('express');
const app = express();
const port = 5000;

// Khoi tao database
const db = require('./db');
db.defaults({ users: [] }).write();

// Khoi tao template engine
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server da duoc khoi tao tai cong ${port}!`));