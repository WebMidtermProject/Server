const service = require("./service");

getMyGroups = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  try {
    group = await service.getMyGroups(user);
    return res.status(200).json({ data: group });
  } catch {
    return res.status(404);
  }
};

createGroup = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { title, description } = req.body;
  if (title === "" || title === undefined) {
    return res.status(400).json({ Error: "Invalid title" });
  }

  group = await service.createGroupService(user, title, description);
  if (group === null || group === undefined || group.length === 0) {
    return res.status(400).json({ Error: "Error occur" });
  }

  return res.status(200).json({ data: group });
};

addAttendee = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { id: groupId } = req.query;
  const { id } = req.body;
  try {
    result = await service.addAttendee(user, groupId, id);
    return res.status(200).json({ status: result });
  } catch {
    return res.status(404);
  }
};

inviteToGroup = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { userID, groupID } = req.body;
  try {
    result = await service.addToGroup(groupID, userID);
    return res.status(200).json({ status: result });
  } catch {
    return res.status(404);
  }
};

getJoinedGroups = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  try {
    group = await service.getJoinedGroups(user);
    return res.status(200).json({ data: group });
  } catch {
    return res.status(404);
  }
};

getGroupDetail = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { id } = req.params;
  try {
    group = await service.getGroupDetailService(user, id);
    return res.status(200).json({ data: group });
  } catch {
    return res.status(404).json({ Error: "Error occur" });
  }
};

sendInvitation = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { userIDs, groupID } = req.body;
  try {
    result = await service.sendInvitationMail(user, groupID, userIDs);
    return res.status(200).json({ data: result });
  } catch {
    return res.status(404).json({ Error: "Error occur" });
  }
};

module.exports = {
  inviteToGroup,
  createGroup,
  getMyGroups,
  getJoinedGroups,
  addAttendee,
  getGroupDetail,
  sendInvitation
};
