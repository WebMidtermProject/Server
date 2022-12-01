const Base = require('../../db/models/Base.model')
module.exports =  class Group extends Base.BaseModel {
  title;
  description;
  initTable (table) {
    super.initTable(table)
    table.string('title')
    table.string('description')
 
  }
}
