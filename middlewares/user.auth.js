const db = require('../db');

module.exports.login = (req,res,next) => {
    if(!req.signedCookies.userid)
    {
        res.redirect('/users/login');
        return;
    }

    let user = db.get('users').find({ id: req.signedCookies.userid }).value();

    if(!user)
    {
        res.send('Cookie của bạn không đúng');
    }

    next();
}