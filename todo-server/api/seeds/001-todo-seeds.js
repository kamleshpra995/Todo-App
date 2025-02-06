/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').truncate()
  await knex('todos').insert([
    {
      message : "walk the dog"
  },
  {
      
      message : "walk the cat"
  }, {
      message : "feed people"
  }, {
      message : "bring revolution"
  }
  ]);
};
