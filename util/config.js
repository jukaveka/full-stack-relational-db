require('dotenv').config()

const ENVIRONMENT_DATABASE_URL = process.env.TESTING = true ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL

module.exports = {
  DATABASE_URL: ENVIRONMENT_DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET
}