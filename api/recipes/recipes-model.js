const db = require('../data/db-config')
const { 
  addInstructions, 
  addIngredients, 
  addCategories, 
  editInstructions, 
  editIngredients, 
  editCategories,
  getRecipeInstructions,
  getRecipeIngredients,
  getRecipeCategories
  } = require('../middleware/recipe-middleware')

function getRecipes() {
  return db('recipes')
}

async function getRecipeById(recipe_id) {

  const recipe = await db('recipes').where('recipe_id', recipe_id).first()

  const recipe_ingredients = await getRecipeIngredients(recipe_id)

  const recipe_categories = await getRecipeCategories(recipe_id)

  const instructions = await getRecipeInstructions(recipe_id)

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

async function addRecipe(newRecipe) {
  const [{recipe_id}] = await db('recipes').insert({ title:newRecipe.title, source:newRecipe.source }, ['recipe_id'])

  newRecipe.instructions.forEach(async ins => {
    await addInstructions(ins.instruction_step, ins.instruction_name, recipe_id)
  })

  newRecipe.ingredients.forEach(async ing => {
    await addIngredients(ing.ingredient_name, recipe_id)
  })

  newRecipe.categories.forEach(async cat => {
    await addCategories(cat.category_name, recipe_id)
  })

  return getRecipeById(recipe_id)
}

async function editRecipe(updatedRecipe, recipe_id) {
  await db('recipes').where('recipe_id', recipe_id).update({ title:updatedRecipe.title, source:updatedRecipe.source })

  const instructions = await getRecipeInstructions(recipe_id)

  for(let i = 0; i < instructions.length; i++) {
    await editInstructions(instructions[i].instruction_name, updatedRecipe.instructions[i].instruction_name)
  }

  const recipe_ingredients = await getRecipeIngredients(recipe_id)

  for(let i = 0; i < recipe_ingredients.length; i++) {
    await editIngredients(recipe_ingredients[i].ingredient_name, updatedRecipe.ingredients[i].ingredient_name)
  }

  const recipe_categories = await getRecipeCategories(recipe_id)

  for(let i = 0; i < recipe_categories.length; i++) {
    await editCategories(recipe_categories[i].category_name, updatedRecipe.categories[i].category_name)
  }

  return getRecipeById(recipe_id)
}

module.exports = {
  getRecipes,
  getRecipeById,
  removeRecipe,
  editRecipe,
  addRecipe
}