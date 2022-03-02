const db = require('../data/db-config')

function getRecipes() {
  return db('recipes')
}

async function getRecipeById(recipe_id) {
  const recipe_categories = await db('category as c')
    .join('recipe_categories as rc', 'rc.category_id', 'c.category_id')
    .where('rc.recipe_id', recipe_id)
    .select('c.category_name')

  const recipe_ingredients = await db('ingredients as i')
    .join('recipe_ingredients as ri', 'ri.ingredient_id', 'i.ingredient_id')
    .where('ri.recipe_id', recipe_id)
    .select('i.ingredient_name')

  const instructions = await db('instructions').where('recipe_id', recipe_id).select('instruction_step', 'instruction_name')

  const recipe = await db('recipes').where('recipe_id', recipe_id).first()

  const result = {
    ...recipe,
    instructions:instructions,
    ingredients:recipe_ingredients,
    categories:recipe_categories
  }

  return result
}

function removeRecipe(recipe_id) {
  return db('recipes').where('recipe_id', recipe_id).del()
}

function editRecipe(recipe_id) {
  return db('recipes')
}

module.exports = {
  getRecipes,
  getRecipeById,
  removeRecipe,
  editRecipe
}