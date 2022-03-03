const router = require('express').Router()

const { getRecipes, getRecipeById, removeRecipe, editRecipe, addRecipe } = require('./recipes-model')
const { checkRecipeId, checkRecipeBody } = require('../middleware/recipe-middleware')

router.get('/', (req, res, next) => {
  getRecipes()
    .then(recipes => res.json(recipes))
    .catch(next)
})

router.get('/:recipe_id', checkRecipeId, (req, res, next) => {
  getRecipeById(req.params.recipe_id)
    .then(recipe => res.json(recipe))
    .catch(next)
})

router.post('/', checkRecipeBody, (req, res, next) => {
  addRecipe(req.body)
    .then(newRecipe => res.status(201).json(newRecipe))
    .catch(next)
})

router.put('/:recipe_id', checkRecipeId, checkRecipeBody, (req, res, next) => {
  editRecipe(req.body, req.params.recipe_id)
    .then(updatedRecipe => res.json(updatedRecipe))
    .catch(next)
})

router.delete('/:recipe_id', checkRecipeId, (req, res, next) => {
  removeRecipe(req.params.recipe_id)
    .then(del => res.json(del))
    .catch(next)
})

module.exports = router