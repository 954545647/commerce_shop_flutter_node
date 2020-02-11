/**
 * @description 用户积分模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { INTEGER } = require("@config/types");
class User_Integral extends Model {}

// 用户积分表
User_Integral.init(
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "用户ID"
    },
    source: {
      type: INTEGER,
      allowNull: false,
      comment: "数据来源：1(签到)、2(下单)、3(评论)、4(兑换)"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = User_Integral;
