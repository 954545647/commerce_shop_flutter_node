/**
 * @description 商品供应商模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING } = require("@config/types");

class Good_Supplier extends Model {}

// 商品供应商表
Good_Supplier.init(
  {
    supplier_name: {
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
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Good_Supplier;
