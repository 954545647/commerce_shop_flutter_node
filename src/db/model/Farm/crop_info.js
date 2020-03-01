/**
 * @description 农场作物模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class Crop_Info extends Model {}

// 农作物信息表
Crop_Info.init(
  {
    cropName: {
      type: STRING,
      allowNull: false,
      comment: "农作物名称"
    },
    price: {
      type: INTEGER,
      allowNull: false,
      comment: "农作物价格：单位m2"
    },
    descript: {
      type: STRING,
      allowNull: false,
      comment: "农作物描述"
    },
    imgCover: {
      type: STRING,
      allowNull: false,
      comment: "农作物封面"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Crop_Info;
