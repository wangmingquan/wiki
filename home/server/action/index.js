var index = require('../model/index.js');
var util = require('../lib/util.js');

module.exports = function(req, res){
  index.getData(req).then(data => {
    res.render('home/page/index.tpl', data);
  });
};