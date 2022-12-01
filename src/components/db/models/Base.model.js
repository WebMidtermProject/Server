const knex = require('../configs/db-connector')
class Index {
  columns;
  name;
  type;
  useRaw;
}

class BaseModel {
  tableName;
  id;
  isDeleted;
  createdAt;
  updatedAt;
  indexes= [];

  constructor (tableName) {
    this.tableName = tableName
  }

    createIndexes (table) {
    for (const index of this.indexes) {
      if (index instanceof Object && !Array.isArray(index)) {
        table.index(index.columns, index.name, index.type)
      } else { table.index(index) }
    }
  }

   initTable (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.boolean('isDeleted').default(false)
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'))
    this.createIndexes(table)
  }
}

module.exports = {Index, BaseModel};