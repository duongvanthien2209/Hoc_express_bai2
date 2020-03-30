require('dotenv').config(); // Khai bao enviroment variable

const express = require('express');
const app = express();
const port = 5000;

// Doc du lieu tu cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SIGNED));

// Doc du lieu tu form goi len
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Khoi tao database
const db = require('./db');
db.defaults({ users: [] }).write();

// Set up static file
app.use(express.static('public'));

// Khoi tao template engine
app.set('views', './views');
app.set('view engine', 'pug');

// Middlewares
const userMiddleware = require('./middlewares/user.auth');

// Controller
const userController = require('./controllers/user.controller');

// Create
app.get('/users/create', userController.getCreate);
app.post('/users/create', userController.postCreate);

// Login
app.get('/users/login', userController.getLogin);
app.post('/users/login', userController.postLogin);

app.use(userMiddleware.login);

app.get('/users', userController.getAll);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server da duoc khoi tao tai cong ${port}!`));