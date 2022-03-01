const ingredients = [
  { ingredient_name:'blueberry' },
  { ingredient_name:'chicken' },
  { ingredient_name:'beef' },
  { ingredient_name:'chocolate' },
  { ingredient_name:'flour' },
  { ingredient_name:'sugar' },
]

const recipe_ingredients = [
  { recipe_id:1, ingredient_id:1 },
  { recipe_id:1, ingredient_id:5 },
  { recipe_id:1, ingredient_id:6 },

  { recipe_id:2, ingredient_id:4 },
  { recipe_id:2, ingredient_id:5 },
  { recipe_id:2, ingredient_id:6 },

  { recipe_id:3, ingredient_id:3 },

  { recipe_id:4, ingredient_id:2 },

  { recipe_id:5, ingredient_id:2 },

  { recipe_id:6, ingredient_id:1 },
  { recipe_id:6, ingredient_id:5 },
  { recipe_id:6, ingredient_id:6 },
]

exports.seed = async function(knex) {
  await knex('ingredients').insert(ingredients)
  await knex('recipe_ingredients').insert(recipe_ingredients)
};
