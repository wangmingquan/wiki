var log = require('log-mini');

module.exports = () => {
  var knex = yog.knex;
  
  knex.schema.createTableIfNotExists('dir', function (table) {
    table.charset('utf8mb4');
    table.engine('InnoDB');
    table.increments('_id').primary().notNullable();
    table.varchar('dirname');
    table.varchar('path');
    table.varchar('fullpath');
    table.timestamps();
  }).then(rel => {
    log.info('dir table is created');
  }, err => {
    log.error(err);
  });

  knex.schema.createTableIfNotExists('file', function (table) {
    table.charset('utf8mb4');
    table.engine('InnoDB');

    table.increments('_id').primary().notNullable();
    table.varchar('filename');
    table.varchar('path');
    table.varchar('fullpath');
    table.varchar('title');
    table.longtext('content');
    table.timestamps();
  }).then(rel => {
    log.info('file table is created');
  }, err => {
    log.error(err);
  });
};
