/**
 * @description 优惠卷使用情况模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { INTEGER } = require("@config/types");
class Coupon_History extends Model {}

// 优惠卷使用情况表
Coupon_History.init(
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "用户使用Id"
    },
    couponId: {
      type: INTEGER,
      allowNull: false,
      comment: "优惠卷Id"
    },
    orderId: {
      type: INTEGER,
      allowNull: true,
      comment: "订单Id"
    },
    use_state: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "优惠卷使用状态：0(未使用),1(已经使用)"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Coupon_History;
