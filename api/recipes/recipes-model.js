const db = require('../data/db-config')

function getRecipes() {
  return db('recipes')
}

async function getRecipeById(recipe_id) {

  const recipe = await db('recipes').where('recipe_id', recipe_id).first()

  const recipe_ingredients = await db('ingredients as i')
    .join('recipe_ingredients as ri', 'ri.ingredient_id', 'i.ingredient_id')
    .where('ri.recipe_id', recipe_id)
    .select('i.ingredient_name')

  const recipe_categories = await db('category as c')
    .join('recipe_categories as rc', 'rc.category_id', 'c.category_id')
    .where('rc.recipe_id', recipe_id)
    .select('c.category_name')

  const instructions = await db('instructions').where('recipe_id', recipe_id).select('instruction_step', 'instruction_name')

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


// ADD RECIPE FUNCTIONS
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

function addInstructions(step, name, recipe_id) {
  return db('instructions').insert({ instruction_step:step, instruction_name:name, recipe_id})
}

async function addIngredients(name, recipe_id) {
  const [{ingredient_id}] = await db('ingredients').insert({ ingredient_name:name }, ['ingredient_id'])
  return db('recipe_ingredients').insert({ ingredient_id:ingredient_id, recipe_id:recipe_id })
}

async function addCategories(name, recipe_id) {
  const [{category_id}] = await db('category').insert({ category_name:name }, ['category_id'])
  return db('recipe_categories').insert({ category_id:category_id, recipe_id:recipe_id })
}
// ADD RECIPE END



// EDIT RECIPE FUNCTIONS
async function editRecipe(updatedRecipe, recipe_id) {
  await db('recipes').where('recipe_id', recipe_id).update({ title:updatedRecipe.title, source:updatedRecipe.source })

  updatedRecipe.instructions.forEach(async ins => {
    await editInstructions(ins.instruction_step, ins.instruction_name, recipe_id)
  })

  const recipe_ingredients = await db('ingredients as i')
    .join('recipe_ingredients as ri', 'ri.ingredient_id', 'i.ingredient_id')
    .where('ri.recipe_id', recipe_id)
    .select('i.ingredient_name')

  for(let i = 0; i < recipe_ingredients.length; i++) {
    await editIngredients(recipe_ingredients[i].ingredient_name, updatedRecipe.ingredients[i].ingredient_name)
  }

  const recipe_categories = await db('category as c')
    .join('recipe_categories as rc', 'rc.category_id', 'c.category_id')
    .where('rc.recipe_id', recipe_id)
    .select('c.category_name')

  for(let i = 0; i < recipe_categories.length; i++) {
    await editCategories(recipe_categories[i].category_name, updatedRecipe.categories[i].category_name)
  }

  return getRecipeById(recipe_id)
}

function editInstructions(step, name, recipe_id) {
  return db('instructions').where('recipe_id', recipe_id).update({ instruction_step:step, instruction_name:name })
}

function editIngredients(oldName, newName) {
  return db('ingredients').where('ingredient_name', oldName).update({ ingredient_name:newName })
}

function editCategories(oldName, newName) {
  return db('category').where('category_name', oldName).update({ category_name:newName })
}
// EDIT RECIPE END


module.exports = {
  getRecipes,
  getRecipeById,
  removeRecipe,
  editRecipe,
  addRecipe
}