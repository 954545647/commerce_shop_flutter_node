/**
 * @description 商品供应商模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class Good_Supplier extends Model {}

// 商品供应商表
Good_Supplier.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING,
      allowNull: false,
      comment: "供应商帐号"
    },
    password: {
      type: STRING,
      allowNull: false,
      comment: "供应商密码"
    },
    phone: {
      type: STRING,
      allowNull: false,
      comment: "供应商电话"
    },
    idNum: {
      type: STRING,
      allowNull: false,
      comment: "身份证号码"
    },
    imgCover: {
      type: STRING,
      allowNull: false,
      comment: "店铺头像"
    },
    frontImg: {
      type: STRING,
      allowNull: false,
      comment: "身份证正面"
    },
    backImg: {
      type: STRING,
      allowNull: false,
      comment: "身份证反面"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Good_Supplier;
