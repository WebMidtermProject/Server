const knex = require("../db/configs/db-connector");
const Group = require("./models/group");
const groupAttendee = require("./models/groupAttendee");
getAllGroups = async (user) => {
  group = await knex("Group as G")
    .join("GroupAttendee as GA", "GA.group_id", "G.id")
    .where({ "GA.user_id": user.id })
    .select("G.*");
};

createGroup = async (user, title, description) => {
  newGroup = { title: title, description: description }

  existedGroup = await knex("Group").where("title",title).first()
  if (existedGroup !== undefined){
    return null
  }

  group = await knex("Group").insert(newGroup).returning("*");
  if (group.length == 0) {
    return null;
  }

  newGroupAttendee = {
    user_id: user.id,
    group_id: group[0].id,
    role: groupAttendee.AttendeeRole.OWNER,
  };
  await knex("GroupAttendee").insert(newGroupAttendee).returning("*");
  
  return group;
};

module.exports = { getAllGroups, createGroup};
