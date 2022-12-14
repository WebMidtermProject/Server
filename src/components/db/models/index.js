const knex = require('../configs/db-connector')

const User = require('../../user/models/user') 
const Group = require('../../group/models/group')
const GroupAttendee = require('../../group/models/groupAttendee').GroupAttendee
const Presentation = require('../../presentation/models/presentation')
const Slide = require('../../presentation/models/slide')
const Answer = require('../../presentation/models/answer')

// Init model
const user = new User('User')
const group = new Group('Group')
const groupAttendee = new GroupAttendee('GroupAttendee')
const presentation = new Presentation('Presentation')
const slide = new Slide('Slide')
const answer = new Answer('Answer')

const arrayModel = [
    user,
    group,
    groupAttendee,
    presentation,
    slide,
    answer
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


