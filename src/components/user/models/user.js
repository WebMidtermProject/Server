const Base = require('../../db/models/Base.model')
module.exports =  class User extends Base.BaseModel {
  name;
  email;
  password;
  first_name;
  last_name;
  picture;
  google_token;
  initTable (table) {
    super.initTable(table)
    table.string('name')
    table.string('email')
    table.string('password')
    table.string('first_name')
    table.string('last_name')
    table.string('picture')
    table.string('google_token')
    table.index('name', 'name_index1')
  }
}
