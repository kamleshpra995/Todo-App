exports.up = async (knex) => {
  await knex.schema.createTable('lists', tbl => {
    tbl.increments();
    tbl.string('name', 256).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // Add list_id to todos table
  await knex.schema.alterTable('todos', tbl => {
    tbl.integer('list_id')
       .references('id')
       .inTable('lists')
       .onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('todos', tbl => {
    tbl.dropColumn('list_id');
  });
  await knex.schema.dropTableIfExists('lists');
};