const recipes = [
  { title:'blueberry pie', source:'grandma' },
  { title:'chocolate cake', source:'grandma' },
  { title:'roast beef', source:'grandpa' },
  { title:'fried chicken', source:'mom' },
  { title:'roast chicken', source:'mom' },
  { title:'blueberry muffins', source:'dad' },
]

exports.seed = function(knex) {
  return knex('recipes').insert(recipes)
}
