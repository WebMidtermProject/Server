const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const authService = require("./authService");
const users = require("../../mock/user/users.json");
require("dotenv").config();

const register = async (req, res) => {
  const { email: email, password: pwd } = req.body;

  if (!email || !pwd) {
    return res
      .status(400)
      .json({ content: "Email and Password are required!!!" });
  }
  const foundUser = users.find((user) => user.email === email);

  if (foundUser) {
    return res.status(401).json({ content: "Email address already exists" });
  }

  try {
    const hashedPwd = await bcryptjs.hash(pwd, 10);

    const newUser = { email: email, password: hashedPwd };
    // add to database
    // ...
    //
    const otherUsers = users.filter((user) => user.email !== email);
    const newUserDB = [...otherUsers, newUser];
    await fsPromises.writeFile(
      path.join(__dirname, "..", "mock", "user", "users.json"),
      JSON.stringify(newUserDB)
    );

    return res.status(200).json({ ...newUser });
  } catch (err) {
    return res.status(500).json({ content: err.message });
  }
};

const login = async (req, res) => {
  const { email: email, password: pwd } = req.body;

  const accessToken = jwt.sign(
    { email: email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    { email: email, token: accessToken },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Update refreshToken to mock data
  const hashedPwd = await bcryptjs.hash(pwd, 10);
  const loggedUser = { email, password: hashedPwd, refreshToken };
  /*     res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); */
  const otherUsers = users.filter((user) => user.email !== email);
  const newDB = [...otherUsers, loggedUser];
  await fsPromises.writeFile(
    path.join(__dirname, "..", "..", "mock", "user", "users.json"),
    JSON.stringify(newDB)
  );

  return res.status(200).json({ email: loggedUser.email, accessToken });
};

module.exports = { register, login };
