var knex = require('knex');
module.exports.knex = (app, conf) => {
  yog.knex = knex(conf);
};
