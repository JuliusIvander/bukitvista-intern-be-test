require("dotenv").config();

const { Sequelize } = require("sequelize");

const options = {
  host: "localhost",
  dialect: "mysql",
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  options
);

module.exports = sequelize;
