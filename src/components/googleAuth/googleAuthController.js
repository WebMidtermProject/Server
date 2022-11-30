const fsPromises = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

const authGoogleService = require("./googleAuthService");
const knex = require("../db/configs/db-connector")

module.exports.signup = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await authGoogleService.testFunction(
        req.body.credential
      );

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      /*       const otherUsers = users.filter((user) => user.email !== email);
      const newUserDB = [...otherUsers, newUser];
      await fsPromises.writeFile(
        path.join(__dirname, "..", "mock", "user", "users.json"),
        JSON.stringify(newUserDB)
      ); */
      const newUser = {
        first_name: profile?.given_name,
        last_name: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
        google_token: jwt.sign(
          { email: profile?.email },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      };
      
      insertedUser = await knex('User').insert(newUser).returning('*')
      
      res.status(201).json({
        message: "Signup was successful",
        user: insertedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
};

module.exports.signin = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await authGoogleService.testFunction(
        req.body.credential
      );
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const foundUser = users.find((user) => user?.email === profile?.email);

      if (!foundUser) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign(
            { email: profile?.email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          ),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};
