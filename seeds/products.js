exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('products').insert([
        {
          id: 1,
          name: 'Bubble Milk Tea',
          price: 45
        },
        {
          id: 2,
          name: 'Brown Sugar Bubble Milk Tea',
          price: 55
        },
        {
          id: 3,
          name: 'Fruit Jelly Bubble Milk Tea',
          price: 50
        }
      ]);
    });
};
