const knex = require("../db/configs/db-connector")

module.exports.getAllUsers = async (req, res) => {

  users = await knex('User').select('*')
  return res.status(200).json(users);
};
