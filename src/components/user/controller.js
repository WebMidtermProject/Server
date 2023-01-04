const knex = require("../db/configs/db-connector");

getMyProfile = async (req, res) => {
  user = req.user;
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  profile = await knex("User").where({ id: user.id }).first();
  if (profile !== undefined) {
    profile.password = "";
  }
  return res.status(200).json({ data: profile });
};

editName = async (req, res) => {
  user = req.user;
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ Error: "Invalid name" });
  }

  profile = await knex("User")
    .where({ id: user.id })
    .update({ first_name: name, last_name: "" });
  if (profile !== undefined) {
    profile.password = "";
  }
  return res.status(200).json({ data: profile });
};

module.exports = { getMyProfile, editName };
