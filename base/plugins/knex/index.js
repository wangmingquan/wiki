var knex = require('knex');
var create_table = require('./create_table.js');

module.exports.knex = (app, conf) => {
  yog.knex = knex(conf);
  create_table();
};
