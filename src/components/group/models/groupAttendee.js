const Base = require('../../db/models/Base.model')
class GroupAttendee extends Base.BaseModel {
  user_id;
  group_id;
  role;
  initTable (table) {
    super.initTable(table)
    table.uuid('user_id')
    table.uuid('group_id')
    table.integer('role')
    table.index('user_id', 'user_index1')
    table.index('group_id', 'group_index1')

  }
}

const AttendeeRole = {
  KICK_OUT: 0,
  OWNER: 1,
  CO_OWNER: 2,
  MEMBER: 3,
}

module.exports =  {GroupAttendee, AttendeeRole}