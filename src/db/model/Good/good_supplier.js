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
    supplierName: {
      type: STRING,
      allowNull: false,
      comment: "供应商名称"
    },
    phone: {
      type: STRING,
      allowNull: false,
      comment: "供应商电话"
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: "供应商地址"
    },
    cover: {
      type: STRING,
      allowNull: false,
      comment: "供应商封面"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Good_Supplier;
