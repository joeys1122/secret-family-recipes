const router = require('express').Router()

const { getRecipes, getRecipeById, removeRecipe } = require('./recipes-model')

router.get('/', (req, res, next) => {
  getRecipes()
    .then(recipes => res.json(recipes))
    .catch(next)
})

router.get('/:recipe_id', (req, res, next) => {
  getRecipeById(req.params.recipe_id)
    .then(recipe => res.json(recipe))
    .catch(next)
})

router.delete('/:recipe_id', (req, res, next) => {
  removeRecipe(req.params.recipe_id)
    .then(del => res.json(del))
    .catch(next)
})

module.exports = router