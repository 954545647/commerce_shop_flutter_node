/**
 * @description 订单信息主模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config");

class Order_Info extends Model {}

// 订单信息主表
Order_Info.init(
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
    pay_money: {
      type: INTEGER,
      allowNull: false,
      comment: "实际支付金额"
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: "收货地址"
    },
    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "订单状态：1：未支付，2：已支付，3：失效"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Order_Info;
