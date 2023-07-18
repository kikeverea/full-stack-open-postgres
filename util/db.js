const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require('../util/config')

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to database')
  }
  catch (e) {
    console.log('Failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectToDatabase }