const db = require('../db');

module.exports.login = (req,res,next) => {
    if(!req.cookie.userid)
    {
        res.redirect('/user/login');
        return;
    }

    let user = db.get('users').find({ id: req.cookie.userid }).value();

    if(!user)
    {
        res.send('Cookie của bạn không đúng');
    }

    next();
}