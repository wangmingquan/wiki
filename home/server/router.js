let secret = 'test_2018_zheli_wiki';
let jwt = require('jsonwebtoken');

module.exports = function (router) {
  router.route('/___login')
    .get(router.action('login'))
    .post(router.action('login'));

  router.route('*').get((req, res, next) => {
    console.log('run to here')
    let cookies = req.cookies;
    let url = req.url;
    if (url !== '/___login') {
      if (cookies.token) {
        jwt.verify(cookies.token, secret, (err, decoded) => {
          if (err) {
            res.redirect('/___login');
          } else {
            if (decoded !== 'test') {
              res.redirect('/___login');
            } else {
              next();
            }
          }
        });
      } else {
        res.redirect('/___login');
      }
    }
  });

  router.route('/___search').get(router.action('search'));
  router.route('/___download').get(router.action('download'));

  router.route('*')
    .get(router.action('index'));
};
