/**
 * @description 用户模型表
 */

const sequelize = require("@db/seq");
const { Model } = require("sequelize");
const { STRING } = require("@config/types");
class User extends Model {}

User.init(
  {
    username: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    phone: {
      type: STRING,
      allowNull: false,
      // unique: true,
      comment: "手机号唯一"
    }
  },
  {
    sequelize
  }
);

module.exports = User;
