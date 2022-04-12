const sequelize = require('./db');
const { DataTypes } = require('sequelize');
const User = sequelize.define('user_telegram', {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  chatId: { type: DataTypes.STRING, unique: true },
  rightt: { type: DataTypes.INTEGER, defaultValue: 0 },
  wrong: { type: DataTypes.INTEGER, defaultValue: 0 },

})

module.exports = User;