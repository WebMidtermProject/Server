const knex = require("../db/configs/db-connector");

module.exports.getMyProfile = async (req, res) => {
  user = req["currentUser"];
  if (user === undefined) {
    return res.status(400).json({ Error: "Invalid user" });
  }

  profile = await knex("User").where({ id: user.id }).first();
  if (profile !== undefined) {
    profile.password = ""
  }
  return res.status(200).json(profile);
};
