const knex = require("knex");

const dotenv = require('dotenv');
dotenv.config();
module.exports =knex({
  client: 'pg',
  connection: {
    host: process.env.DB_URL,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
})

require('../models')

