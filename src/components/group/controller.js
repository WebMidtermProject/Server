const service = require("./service");

getAllGroups = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  try {
    group = service.getAllGroups(user);
    return res.status(200).json(group);
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
  if (title == "" || title == undefined) {
    return res.status(400).json({ Error: "Invalid title" });
  }

  group = await service.createGroup(user, title, description);
  if (group === null || group === undefined) {
    return res.status(400).json({ Error: "Error occur" });
  }

  return res.status(200).json(group);
};

module.exports = { createGroup, getAllGroups };
