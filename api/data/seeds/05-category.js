const category = [
  { category_name:'breakfast' },
  { category_name:'lunch' },
  { category_name:'dinner' },
  { category_name:'dessert' },
  { category_name:'brunch' },
]

const recipe_categories = [
  { recipe_id:1, category_id:2 },
  { recipe_id:1, category_id:4 },
  { recipe_id:1, category_id:5 },

  { recipe_id:2, category_id:4 },

  { recipe_id:3, category_id:3 },

  { recipe_id:4, category_id:3 },

  { recipe_id:5, category_id:3 },

  { recipe_id:6, category_id:1 },
  { recipe_id:6, category_id:2 },
  { recipe_id:6, category_id:4 },
  { recipe_id:6, category_id:5 },
]

exports.seed = async function(knex) {
  await knex('category').insert(category)
  await knex('recipe_categories').insert(recipe_categories)
};
