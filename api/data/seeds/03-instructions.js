const instructions = [
  { instruction_step:1, instruction_name:'Trim crust to rim of the pan', recipe_id:1 },
  { instruction_step:2, instruction_name:'Pour blueberry mixture into pie shell', recipe_id:1 },
  { instruction_step:3, instruction_name:'Place pie in oven for 40 to minutes', recipe_id:1 },

  { instruction_step:1, instruction_name:'Mix cocoa with flour baking soda and salt', recipe_id:2 },
  { instruction_step:2, instruction_name:'Mix butter and sugar until light and fluffy', recipe_id:2 },
  { instruction_step:3, instruction_name:'Bake in oven for 30 to 40 minutes', recipe_id:2 },

  { instruction_step:1, instruction_name:'Cut roast in half', recipe_id:3 },
  { instruction_step:2, instruction_name:'Pour soup mix over roast', recipe_id:3 },
  { instruction_step:3, instruction_name:'Cover and cook on low for 8 to 9 hours', recipe_id:3 },
]

exports.seed = function(knex) {
  return knex('instructions').insert(instructions)
}