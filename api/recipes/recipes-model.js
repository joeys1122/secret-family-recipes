const db = require('../data/db-config')

function getRecipes() {
  return db('recipes')
}

function getRecipeById(recipe_id) {
  return db('recipes').where('recipe_id', recipe_id).first()
}

function removeRecipe(recipe_id) {
  return db('recipes').where('recipe_id', recipe_id).del()
}

module.exports = {
  getRecipes,
  getRecipeById,
  removeRecipe
}