const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  'postgres',
  'root',
  'root',
  {
    host: '5.188.77.212',
    port: '6432',
    dialect: 'postgres'
  }
)