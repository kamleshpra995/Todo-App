/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  
  await  knex.schema.createTable('todos', tbl =>{
        tbl.increments();
        tbl.text('message',256).notNullable();
        tbl.boolean('status').defaultTo(false);
        tbl.timestamp('completedOn').nullable();
    })


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {

  await  knex.schema.dropTableIfExists('todos');
  
};
