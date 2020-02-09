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
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: "下单人id（用户id）"
    },
    order_username: {
      type: STRING,
      allowNull: false,
      comment: "下单人姓名"
    },
    payment_method: {
      type: INTEGER,
      allowNull: false,
      comment: "支付方式：0余额，1线上"
    },
    order_money: {
      type: INTEGER,
      allowNull: false,
      comment: "订单金额"
    },
    payment_money: {
      type: INTEGER,
      allowNull: false,
      comment: "支付金额"
    },
    discount_money: {
      type: INTEGER,
      allowNull: false,
      comment: "优惠卷优惠金额"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Order_Info;
