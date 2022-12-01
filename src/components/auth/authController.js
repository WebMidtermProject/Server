const knex = require("../db/configs/db-connector");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("./authService");

require("dotenv").config();

const register = async (req, res) => {
  const {
    email: email,
    password: pwd,
    firstname: first_name,
    lastname: last_name,
  } = req.body;

  if (!email || !pwd || !first_name || !last_name) {
    return res.status(400).json({ content: "Missing fields are required!!!" });
  }

  //check email existed
  const existedUser = await knex("User").where("email", email).first();
  if (existedUser !== undefined) {
    return res.status(401).json({ content: "Email address already exists" });
  }

  try {
    const hashedPwd = await bcryptjs.hash(pwd, 10);

    const newUser = {
      email: email,
      password: hashedPwd,
      first_name: first_name,
      last_name: last_name,
    };
    newData = await knex("User").insert(newUser).returning("*");
    return res.status(200).json({ status: "OK" });
  } catch (err) {
    return res.status(500).json({ content: err.message });
  }
};

const login = async (req, res) => {
  const { email: email, password: pwd } = req.body;
  if (email === undefined || pwd === undefined) {
    return res.status(401).json({ content: "Email or Password invalid!" });
  }

  //check email existed
  const existedUser = await knex("User").where("email", email).first();
  if (existedUser === undefined) {
    return res.status(401).json({ content: "Email or Password invalid!" });
  }

  bcryptjs.compare(pwd, existedUser.password, async (err, data) => {
    //if error than throw error
    if (err) {
      return res.status(401).json({ error: err });
    }

    //if password match hash password
    if (data) {
      const accessToken = jwt.sign(
        { email: email, name: existedUser.first_name + " " + existedUser.last_name, id: existedUser.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60000s" }
      );

      const refreshToken = jwt.sign(
        { email: email, token: accessToken },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Update refreshToken to mock data
      const hashedPwd = await bcryptjs.hash(pwd, 10);
      const loggedUser = { email, password: hashedPwd, refreshToken };

      return res.status(200).json({
        email: loggedUser.email,
        name: existedUser.first_name + " " + existedUser.last_name,
        id: existedUser.id,
        accessToken,
      });
    } else {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  });
};

module.exports = { register, login };
