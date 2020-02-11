/**
 * @description 用户地址模型表
 */
const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER, BOOLEAN } = require("@config/types");

class User_Address extends Model {}

// 用户地址
User_Address.init(
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "用户ID"
    },
    username: {
      type: STRING,
      allowNull: false,
      comment: "收件人姓名"
    },
    phone: {
      type: STRING,
      allowNull: false,
      comment: "收件人手机号码"
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
    area: {
      type: STRING,
      allowNull: false,
      comment: "区"
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: "详细地址"
    },
    isDefault: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: true,
      comment: "是否是默认地址"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = User_Address;
