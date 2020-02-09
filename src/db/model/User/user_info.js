/**
 * @description 用户模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");
class User_Info extends Model {}

// 用户信息表
User_Info.init(
  {
    username: {
      type: STRING,
      allowNull: false,
      comment: "用户名"
    },
    password: {
      type: STRING,
      allowNull: false,
      comment: "密码"
    },
    phone: {
      type: STRING,
      allowNull: false,
      // unique: true,
      comment: "手机号唯一"
    },
    point: {
      type: INTEGER,
      allowNull: true,
      comment: "用户积分",
      defaultValue: 0
    }
  },
  {
    sequelize: seq
  }
);

module.exports = User_Info;
