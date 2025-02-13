exports.up = function(knex) {
  return knex.schema.table('todos', table => {
    // Rename message to title
    table.renameColumn('message', 'title');
    
    // Add new columns
    table.string('details').nullable();
    table.string('priority').defaultTo('Medium');
    table.datetime('dueDate').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('todos', table => {
    table.renameColumn('title', 'message');
    table.dropColumn('details');
    table.dropColumn('priority');
    table.dropColumn('dueDate');
  });
};