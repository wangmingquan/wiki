module.exports.get = (req, res, next) => {
  var word = req.query.word;
  var path = req.query.path || '';
  var data = {
    word,
    path
  };
  if (!word) {
    res.json({status: -1, message: '缺少关键字'});
  }
  yog.knex('file').select('fullpath', 'content').where('content', 'like', `%${word}%`).then(rel => {
    var list = [];
    for (var i in rel) {
      var content = rel[i].content.replace(/\n/mg, '').replace(/\s/mg, '');
      var index = content.indexOf(word);
      if (index == -1) {word = word.toLocaleLowerCase(); index = content.indexOf(word)}
      if (index == -1) {word = word.toLocaleUpperCase(); index = content.indexOf(word)}
      if (index < 20) {index = 20};
      var substr = content.substr(index - 20, 40);
      const fullpath = rel[i].fullpath;
      list.push({
        fullpath: fullpath,
        des: substr.replace(word, `<b>${word}</b>`),
        isInPath: fullpath.indexOf(path) === 0 ? 'isInPath' : 'notInPath'
      })
    }
    data.list = list;
    res.render('home/page/search.tpl', data);
  }, err => {
    console.log(rel);
  })
};
