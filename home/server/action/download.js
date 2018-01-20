var fs = require('fs');
module.exports.get = (req, res, next) => {
  var url =  req.query.url;
  var wiki_root_path  = yog.wiki_root_path;
  var real_file_path = wiki_root_path + url;
  var paths = url.split('/');
  var filename = paths[paths.length - 1];

  var stats = fs.statSync(real_file_path); 
  if(stats.isFile()){
    // pdf 不强制下载到本地，可以利用浏览的PDF预览功能
    if (!/\.pdf/.test(filename)) {
      res.set({
        'Content-Disposition': 'attachment; filename='+encodeURI(filename)
      });
    }
    fs.createReadStream(real_file_path).pipe(res);
  } else {
    res.end(404);
  }
};
