var marked = require('marked');

module.exports.getData = function (req) {
  var url = decodeURI(req.url);
  var path = decodeURI(req.path);
  var spaths = url.split('/');
  var paths = [];
  var isFile = true;
  if (/\/$/.test(url)) {
    isFile = false;
  }
  for (var i in spaths) {
    if (spaths[i] == '') spaths.splice(i, 1);
  }
  for (var i in spaths) {
    if (i == spaths.length - 1 && !/\/$/.test(url)) {
      paths.push({
        name: spaths[i],
        path: ((paths[i - 1] || {}).path || '/') + spaths[i]
      });
    }
    else {
      paths.push({
        name: spaths[i],
        path: ((paths[i - 1] || {}).path || '/') + spaths[i] + '/'
      });
    }
  }

  var data = {
    url,
    path,
    paths,
    isFile
  };


  if (isFile) {
    return new Promise((resolve, reject) => {
      yog.knex('file').select().where({fullpath: url}).then(rel => {
        data.content = rel[0];
        if (data.content.content) {
          data.content.html = marked(data.content.content);
        }
        if (data.content.title) {
          data.title = data.content.title;
        }
        resolve(data);
      })
    });
  }
  else {
    return new Promise((resolve, reject) => {
      Promise.all([
        yog.knex('file').select('fullpath', 'title', 'filename').where({path}),
        yog.knex('dir').select().where({path})
      ]).then(rel => {
        let hasReadMe = false;
        let readMeFileName = '';
        const files = rel[0];
        const dirs = rel[1];
        data.files = files;
        data.dirs = dirs;
        for (var i in files) {
          if (files[i].filename.toLocaleLowerCase() === 'readme.md') {
            hasReadMe = true;
            readMeFileName = files[i].filename;
          }
        }

        if (!hasReadMe) {
          resolve(data);
        } else {
          yog.knex('file').select().where({ fullpath: url + readMeFileName }).then(rel => {
            data.hasReadMe = true;
            data.readMeFileName = readMeFileName;
            data.readMe = rel[0];
            if (data.readMe.content) {
              data.readMe.html = marked(data.readMe.content);
            }
            resolve(data);
          }, (err) => {
            resolve(data);
          });
        }
      }, err => {
        reject(err);
      })
    });
  }
};