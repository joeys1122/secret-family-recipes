const db = require('../data/db-config')

const checkRecipeId = async (req, res, next) => {
  const recipe = await db('recipes').where('recipe_id', req.params.recipe_id).first()

  if(!recipe) {
    next({ status:404, message:`recipe with id ${req.params.recipe_id} not found` })
  } else {
    next()
  }
}

const checkRecipeBody = (req, res, next) => {
  if(!req.body.title || !req.body.source) {
    next({ status:400, message:'recipe title and source required' })
  } else if(!req.body.instructions) {
    next({ status:400, message:'instructions list required' })
  } else if(!req.body.ingredients) {
    next({ status:400, message:'ingredients list required' })
  } else if(!req.body.categories) {
    next({ status:400, message:'categories list required' })
  } else {
    next()
  }
}

function getRecipeInstructions(recipe_id) {
  return db('instructions').where('recipe_id', recipe_id).select('instruction_step', 'instruction_name')
}

function getRecipeIngredients(recipe_id) {
  return db('ingredients as i')
  .join('recipe_ingredients as ri', 'ri.ingredient_id', 'i.ingredient_id')
  .where('ri.recipe_id', recipe_id)
  .select('i.ingredient_name')
}

function getRecipeCategories(recipe_id) {
  return db('category as c')
  .join('recipe_categories as rc', 'rc.category_id', 'c.category_id')
  .where('rc.recipe_id', recipe_id)
  .select('c.category_name')
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

function editInstructions(oldName, newName) {
  return db('instructions').where('instruction_name', oldName).update({ instruction_name:newName })
}

function editIngredients(oldName, newName) {
  return db('ingredients').where('ingredient_name', oldName).update({ ingredient_name:newName })
}

function editCategories(oldName, newName) {
  return db('category').where('category_name', oldName).update({ category_name:newName })
}

module.exports = {
  checkRecipeId,
  checkRecipeBody,
  addInstructions,
  addIngredients,
  addCategories,
  editInstructions,
  editIngredients,
  editCategories,
  getRecipeInstructions,
  getRecipeIngredients,
  getRecipeCategories
}