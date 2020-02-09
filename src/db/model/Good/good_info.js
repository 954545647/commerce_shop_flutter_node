/**
 * @description 商品模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class Good_Info extends Model {}

// 商品信息表
Good_Info.init(
  {
    goodName: {
      type: STRING,
      allowNull: false,
      comment: "商品名称"
    },
    price: {
      type: INTEGER,
      allowNull: false,
      comment: "商品价格"
    },
    descript: {
      type: STRING,
      allowNull: false,
      comment: "商品描述"
    },
    stock: {
      type: INTEGER,
      allowNull: false,
      comment: "商品库存"
    },
    imgCover: {
      type: STRING,
      allowNull: false,
      comment: "商品封面"
    },
    sales: {
      type: INTEGER,
      allowNull: false,
      comment: "商品销量"
    },
    supplier_id: {
      type: INTEGER,
      allowNull: false,
      comment: "供应商ID"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Good_Info;
