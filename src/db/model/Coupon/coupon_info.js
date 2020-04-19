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
    source: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "优惠卷来源，值为商家id"
    },
    threshold: {
      type: INTEGER,
      allowNull: false,
      comment: "阙值"
    },
    faceValue: {
      type: INTEGER,
      allowNull: false,
      comment: "面值"
    },
    count: {
      type: INTEGER,
      allowNull: false,
      comment: "优惠卷数量"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Coupon_Info;
