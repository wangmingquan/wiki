var fs = require('fs');
var log = require('log-mini')
var chokidar = require('chokidar');

module.exports.filescan = ['knex', (app, conf) => {
  var rootPath = conf.rootPath;
  yog.wiki_root_path = rootPath;
  chokidar.watch(rootPath, {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
    var fullpath = path.replace(rootPath, '');
    var paths = fullpath.split('/');
    var filename = paths.pop();
    var _path = fullpath.replace(filename, '');
    if (event === 'add' || event === 'change') {
      // 首次遍历 添加文件 文件变动
      syncFile({
        currentPath: path,
        filename,
        path: _path
      });
    }
    else if (event === 'addDir'){
      // 文件夹
      syncDir({
        dirname: filename,
        path: _path
      });
    }
    else if (event === 'unlink') {
      // 删除文件
      deleteFile(fullpath);
    }
    else if (event === 'unlinkDir') {
      deleteDir(fullpath);
      // 删除文件夹
    }
    else {
      console.log(event);
    }
  });

  function deleteDir (fullpath) {
    yog.knex('dir').delete().where({fullpath}).then(rel => {
      log.success('dir ' +fullpath + ' deleted success')
    }, err => {
      log.error(err);
    })
  }

  function deleteFile (fullpath) {
    console.log(fullpath);
    yog.knex('file').delete().where({fullpath}).then(rel => {
      log.success('file ' +fullpath + ' deleted success')
    }, err => {
      log.error(err);
    })
  }

  function syncDir (options) {
    var path = options.path;
    var dirname = options.dirname;
    var fullpath = path + dirname;

    var condition = {
      dirname,
      path,
      fullpath
    };
    yog.knex('dir').select('_id').where({fullpath}).then(rel => {
      if (!rel.length) {
        yog.knex('dir').insert(condition).then(rel => {
          log.success('dir ' +fullpath + ' inserted success')
        }, err => {
          log.error(err);
        })
      }
    }, err => {})
  };

  function syncFile (options) {
    var path = options.path;
    var filename = options.filename;
    var fullpath = path + filename;
    var currentPath = options.currentPath;
    var title = filename;
    var condition = {
      filename,
      path,
      fullpath,
      title
    };
    var syncForDb = () => {
      yog.knex('file').select('_id').where({fullpath}).then(rel => {
        if (rel.length) {
          yog.knex('file').update(condition).where({fullpath}).then(rel => {
            log.success(fullpath + ' updateed success')
          }, err => {
            log.error(err);
          })
        }
        else {
          condition.created_time = new Date();
          yog.knex('file').insert(condition).then(rel => {
            log.success(fullpath + ' inserted success')
          }, err => {
            log.error(err);
          })
        }
      }, err => {})
    };

    if (/\.md$/.test(currentPath)) {
      // markdown 文件，读取内容
      fs.readFile(currentPath, 'utf-8', function(err, content) {
        if (/^#\s.+\n/.test(content)) {
          var titleRepx = /^#\s(.+)\n/.exec(content);
          title = titleRepx[1];
        }
        condition.title = title;
        condition.content = content;
        syncForDb();
      });
    }
    else {
      syncForDb();
    }
  };
}];
