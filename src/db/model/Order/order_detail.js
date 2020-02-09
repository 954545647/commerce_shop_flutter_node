/**
 * @description 订单详情模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class Order_Detail extends Model {}

// 订单详情表
Order_Detail.init(
  {
    order_id: {
      type: STRING,
      allowNull: false,
      comment: "订单表id"
    },
    good_id: {
      type: INTEGER,
      allowNull: false,
      comment: "商品id"
    },
    good_name: {
      type: STRING,
      allowNull: false,
      comment: "商品名称"
    },
    good_cnt: {
      type: INTEGER,
      allowNull: false,
      comment: "商品数量"
    },
    good_price: {
      type: INTEGER,
      allowNull: false,
      comment: "商品单价"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Order_Detail;
