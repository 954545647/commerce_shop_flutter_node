/**
 * @description 订单购物车模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { INTEGER } = require("@config/types");

class Order_Cart extends Model {}

// 订单购物车表
Order_Cart.init(
  {
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: "用户id"
    },
    good_id: {
      type: INTEGER,
      allowNull: false,
      comment: "商品id"
    },
    good_num: {
      type: INTEGER,
      allowNull: false,
      comment: "加入购物车商品数量"
    },
    good_price: {
      type: INTEGER,
      allowNull: false,
      comment: "商品价格"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Order_Cart;
