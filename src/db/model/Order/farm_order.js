/**
 * @description 订单信息主模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config");

class Farm_Order extends Model {}

// 订单信息主表
Farm_Order.init(
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "下单人id（用户id）"
    },
    couponId: {
      type: INTEGER,
      allowNull: true,
      comment: "使用优惠卷id"
    },
    order_amount: {
      type: INTEGER,
      allowNull: false,
      comment: "订单金额"
    },
    farmCount: {
      type: INTEGER,
      allowNull: false,
      comment: "租地数量（块）"
    },
    pay_money: {
      type: INTEGER,
      allowNull: false,
      comment: "实际支付金额"
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: "收货地址"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Farm_Order;
