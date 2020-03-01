/**
 * @description 农场订单详情模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class Farm_Order_Detail extends Model {}

// 订单详情表
Farm_Order_Detail.init(
  {
    orderId: {
      type: INTEGER,
      allowNull: false,
      comment: "订单表id"
    },
    cropId: {
      type: INTEGER,
      allowNull: false,
      comment: "农作物id"
    },
    farmId: {
      type: INTEGER,
      allowNull: false,
      comment: "农场id"
    },
    order_username: {
      type: STRING,
      allowNull: false,
      comment: "下单人姓名"
    },
    crop_cover: {
      type: STRING,
      allowNull: false,
      comment: "农作物封面"
    },
    crop_name: {
      type: STRING,
      allowNull: false,
      comment: "农作物名称"
    },
    crop_count: {
      type: INTEGER,
      allowNull: false,
      comment: "农作物数量"
    },
    crop_price: {
      type: INTEGER,
      allowNull: false,
      comment: "农作物单价"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Farm_Order_Detail;
