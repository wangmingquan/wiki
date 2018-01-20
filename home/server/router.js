module.exports = function(router){
  router.route('/___search').get(router.action('search'));
  router.route('/___download').get(router.action('download'));

  router.route('*')
    .get(router.action('index'));
};
