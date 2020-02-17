/**
 * @description 订单购物车模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { INTEGER, STRING } = require("@config/types");

class Order_Cart extends Model {}

// 订单购物车表
Order_Cart.init(
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "用户id"
    },
    goodId: {
      type: INTEGER,
      allowNull: false,
      comment: "商品id"
    },
    goodName: {
      type: STRING,
      allowNull: false,
      comment: "商品名称"
    },
    count: {
      type: INTEGER,
      allowNull: false,
      comment: "加入购物车商品数量"
    },
    price: {
      type: STRING,
      allowNull: false,
      comment: "商品价格"
    },
    expressCount: {
      type: STRING,
      allowNull: false,
      comment: "商品运费"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Order_Cart;
