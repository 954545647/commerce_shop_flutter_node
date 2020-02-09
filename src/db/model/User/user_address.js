/**
 * @description 用户地址模型表
 */
const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class User_Address extends Model {}

// 用户地址
User_Address.init(
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "用户ID"
    },
    province: {
      type: STRING,
      allowNull: false,
      comment: "省"
    },
    city: {
      type: STRING,
      allowNull: false,
      comment: "市"
    },
    distrct: {
      type: STRING,
      allowNull: false,
      comment: "区"
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: "详细地址"
    },
    postcode: {
      type: INTEGER,
      allowNull: false,
      comment: "邮编"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = User_Address;
