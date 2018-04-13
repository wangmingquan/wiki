var index = require('../model/index.js');
var util = require('../lib/util.js');
var fs = require('fs');

module.exports = function(req, res){
  var url = req.url;
  // html 的直接输出 加预览的功能
  if (req.query.preview == 1) {
    var wiki_root_path = yog.wiki_root_path;
    var real_file_path = decodeURIComponent(wiki_root_path + url.split('?')[0]);
    res.setHeader('content-type', 'text/html');
    fs.createReadStream(real_file_path).pipe(res);
    return;
  }
  // 静态文件  直接出结果
  else if (/(png|jpg|jpeg|webp|gif|bmp|svg|mp3|mp4)$/.test(url)) {
    res.redirect(302, '/___download?url=' + url)
    return;
  }
  index.getData(req).then(data => {
    data.isHtml = (filename) => {
      if (/\.html$/.test(filename) || /\.htm$/.test(filename)) {
        return true;
      } else {
        return false;
      }
    }
    res.render('home/page/index.tpl', data);
  });
};