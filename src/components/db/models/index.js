const knex = require('../configs/db-connector')

const User = require('../../user/models/user') 

// Init model
const user = new User('User')

const arrayModel = [
    user
];

module.exports= (async function () {
  for (const model of arrayModel) {
    const result = await knex.schema.hasTable(model.tableName)
    if (!result) {
      await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"') // NOSONAR
      await knex.schema.createTable(model.tableName, model.initTable.bind(model)) // NOSONAR
      model.tableName === 'Reward' && knex.schema.raw('ALTER TABLE "Reward" ADD CONSTRAINT remainingQuantity_is_at_least_0 CHECK ("remainingQuantity" >= 0)')
    }
  }

//   const reaction = await knex('Reaction').where({ isDeleted: false }).first() // NOSONAR
//   if (!reaction) {
//     knex('Reaction').insert({
//       name: 'LIKE'
//     })
//   }
  console.log('CREATE_DB_SUCCESSFULLY')
})()


