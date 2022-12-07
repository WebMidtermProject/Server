const knex = require("../db/configs/db-connector");
const groupAttendee = require("./models/groupAttendee");
const mailService = require("../nodemailer/service")
getMyGroups = async (user) => {
  group = await knex("Group as G")
    .join("GroupAttendee as GA", "GA.group_id", "G.id")
    .leftJoin("User as U", "U.id", "GA.user_id")
    .where({ "GA.user_id": user.id })
    .whereIn("GA.role", [
      groupAttendee.AttendeeRole.OWNER,
      groupAttendee.AttendeeRole.CO_OWNER,
    ])
    .select(
      "G.*",
      "U.name as owner_name",
      "U.first_name as owner_first_name",
      "U.last_name as owner_last_name",
      "U.id as owner_id"
    );

  if (group.length === 0) {
    return group;
  }

  groupResult = [];
  group = Promise.all(
    await group.map(async (gr) => {
      countMember = await knex("GroupAttendee")
        .where({ "group_id ": gr.id })
        .count("user_id");
      if (countMember.length !== 0) {
        gr.total_member = countMember[0].count;
      }
      return gr;
    })
  );

  return group;
};

createGroupService = async (user, title, description) => {
  newGroup = { title: title, description: description };

  existedGroup = await knex("Group").where("title", title).first();
  if (existedGroup !== undefined) {
    return null;
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

addAttendee = async (user, groupId, attendeeId) => {
  group = await knex("Group as G")
    .join("GroupAttendee as GA", "GA.group_id", "G.id")
    .where({ "GA.user_id": user.id })
    .where({ "G.id": groupId })
    .whereIn("GA.role", [
      groupAttendee.AttendeeRole.OWNER,
      groupAttendee.AttendeeRole.CO_OWNER,
    ])
    .first();

  if (group === undefined) {
    return false;
  }

  existedAttendee = await knex("GroupAttendee as GA")
    .where({ "GA.group_id": groupId })
    .where({ "GA.user_id": attendeeId })
    .first();

  if (existedAttendee !== undefined) {
    return false;
  }

  newGroupAttendee = {
    user_id: attendeeId,
    group_id: groupId,
    role: groupAttendee.AttendeeRole.MEMBER,
  };
  await knex("GroupAttendee").insert(newGroupAttendee).returning("*");

  return true;
};

getGroupDetail = async (user, id) => {
  group = await knex("Group as G")
    .join("GroupAttendee as GA", "GA.group_id", "G.id")
    .where({ "GA.user_id": user.id })
    .select("G.*");
};

getJoinedGroups = async (user) => {
  group = await knex("Group as G")
    .join("GroupAttendee as GA", "GA.group_id", "G.id")
    .leftJoin("GroupAttendee as GA2", "GA2.group_id", "G.id")
    .leftJoin("User as U", "U.id", "GA2.user_id")
    .where({ "GA2.role": groupAttendee.AttendeeRole.OWNER })
    .where({ "GA.user_id": user.id })
    .where({ "GA.role": groupAttendee.AttendeeRole.MEMBER })
    .select(
      "G.*",
      "U.name as owner_name",
      "U.first_name as owner_first_name",
      "U.last_name as owner_last_name",
      "U.id as owner_id"
    );

  if (group.length === 0) {
    return group;
  }

  groupResult = [];
  group = Promise.all(
    await group.map(async (gr) => {
      countMember = await knex("GroupAttendee")
        .where({ "group_id ": gr.id })
        .count("user_id");
      if (countMember.length !== 0) {
        gr.total_member = countMember[0].count;
      }
      return gr;
    })
  );
  return group;
};

addToGroup = async (groupId, attendeeId) => {
  group = await knex("Group as G").where({ "G.id": groupId }).first();

  if (group === undefined) {
    return false;
  }

  existedAttendee = await knex("GroupAttendee as GA")
    .where({ "GA.group_id": groupId })
    .where({ "GA.user_id": attendeeId })
    .first();

  if (existedAttendee !== undefined) {
    return false;
  }

  newGroupAttendee = {
    user_id: attendeeId,
    group_id: groupId,
    role: groupAttendee.AttendeeRole.MEMBER,
  };
  await knex("GroupAttendee").insert(newGroupAttendee).returning("*");

  return true;
};

getGroupDetailService = async (user, groupID) => {
  group = await knex("Group as G").where({ "G.id": groupID }).first();

  if (group === undefined) {
    return group;
  }

  members = await knex("GroupAttendee as GA")
    .join("User as U", "U.id", "GA.user_id")
    .where({ "GA.group_id": groupID })
    .select("U.first_name", "U.last_name", "U.id as userID", "GA.role");

  group.memberList = members;
  return group;
};

sendInvitationMail = async (user,groupID, IDs) => {
  if (IDs.length <= 0) {
    return false;
  }
  users = await knex("User as U").whereIn("U.id", IDs).select("U.*");
  if (users === undefined || users.length != IDs.length) {
    return false;
  }
  console.log(users);

  group = await knex("Group as G").where({ "G.id": groupID }).first();
  if (group === undefined) {
    return false;
  }
  users.map((user)=>{
    mailService.sendMail(user.email,"group invitation", JSON.stringify(group))
  })

  return true;
};

module.exports = {
  getMyGroups,
  createGroupService,
  getJoinedGroups,
  addAttendee,
  addToGroup,
  getGroupDetailService,
  sendInvitationMail
};
