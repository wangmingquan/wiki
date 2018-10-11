let jwt = require('jsonwebtoken');
let secret = 'test_2018_zheli_wiki'

module.exports.get = (req, res, next) => {
  res.render('home/page/login.tpl', {
    isLoginPage: true
  });
};

module.exports.post = (req, res, next) => {
  let body = req.body;
  let token = body.token;
  if (!token) {
    res.json({
      status: -1,
      message: '你玩我！'
    });
    return;
  }
  if (token !== 'test') {
    res.json({
      status: -1,
      message: '私家花园，游人勿入！'
    });
    return;
  }
  jwt.sign(token, secret, (err, _token) => {
    res.cookie('token', _token, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });
    res.json({
      status: 0
    });
  });
};
