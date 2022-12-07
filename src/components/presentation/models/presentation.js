const Base = require('../../db/models/Base.model')
module.exports =  class Presentation extends Base.BaseModel {
  title;
  creatorId;
  initTable (table) {
    super.initTable(table)
    table.string('title') 
    table.uuid('creator_id')
  }
}
