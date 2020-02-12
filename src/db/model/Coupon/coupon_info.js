/**
 * @description 优惠卷模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");
class Coupon_Info extends Model {}

// 优惠卷信息表
Coupon_Info.init(
  {
    name: {
      type: STRING,
      allowNull: false,
      comment: "优惠卷名"
    },
    type: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "使用类型：0(全场通用),1(促销商品)"
    },
    with_amount: {
      type: INTEGER,
      allowNull: false,
      comment: "满多少金额"
    },
    used_amount: {
      type: INTEGER,
      allowNull: false,
      comment: "用卷金额"
    }
    // indate: {
    //   type: INTEGER,
    //   allowNull: true,
    //   defaultValue: 30,
    //   comment: "有效期(按天计算)"
    // }
    // quota: {
    //   type: INTEGER,
    //   allowNull: false,
    //   comment: "优惠卷发放数量"
    // },
    // take_count: {
    //   type: INTEGER,
    //   allowNull: false,
    //   comment: "优惠卷领取数量"
    // },
  },
  {
    sequelize: seq
  }
);

module.exports = Coupon_Info;
