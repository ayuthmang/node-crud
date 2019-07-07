
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('products', table => {
      table.increments('id').primary()
      table.string("name");
      table.float("price");
      table.timestamps();
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
