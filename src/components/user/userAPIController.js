const users = require("../../mock/user/users.json");

module.exports.getAllUsers = (req, res) => {
  return res.status(200).send(JSON.stringify(users));
};
