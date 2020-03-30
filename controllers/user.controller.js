const shortid = require('shortid'); // Tao chuoi ngau nhien ==> dung de tao id 
const md5 = require('md5'); // Ma hoa mat khau
const db = require('../db');

// Get all
module.exports.getAll = (req,res) => {
    res.render('users/userList');
};

// Create user
module.exports.getCreate = (req, res) => {
    res.render('users/createUser');
}

module.exports.postCreate = (req, res) => {
    let errors = [];

    if(!req.body.username)
    {
        errors.push('Bạn chưa nhập họ và tên');
    }

    if (!req.body.name) {
        errors.push('Bạn chưa nhập tên đăng nhập');
    }

    if (!req.body.password) {
        errors.push('Bạn chưa nhập mật khẩu');
    }

    if(!req.file) {
        errors.push('Bạn chưa upload file');
    }

    if (errors.length) {
        res.render('users/createUser', { errors });
        return;
    }

    let paths = req.file.path.split('\\');
    let path = paths[1].concat('/',paths[2]);

    db.get('users').push({ password: md5(req.body.password), id: shortid.generate(), name: req.body.name, username: req.body.username, avatar: path }).write();
    res.redirect('/users');
}

// Login
module.exports.getLogin = (req, res) => {
    res.render('users/login');
}

module.exports.postLogin = (req, res) => {
    let errors = [];

    if (!req.body.name) {
        errors.push('Bạn chưa nhập tên đăng nhập');
    }

    if (!req.body.password) {
        errors.push('Bạn chưa nhập mật khẩu');
    }

    if (errors.length) {
        res.render('users/login', { errors });
        return;
    }

    let user = db.get('users').find({name: req.body.name}).value();

    if(!user)
    {
        res.render('users/login', { errors: ['Tên đăng nhập của bạn bị sai'] });
        return;
    }

    if(user.password !== md5(req.body.password))
    {
        res.render('users/login', { errors: ['Bạn nhập sai mật khẩu'] });
        return;
    }

    res.cookie('userid', user.id, { signed: true });
    res.redirect('/users');
}