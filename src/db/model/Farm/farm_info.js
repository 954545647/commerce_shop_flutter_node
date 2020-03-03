/**
 * @description 农场模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class Farm_Info extends Model {}

// 农场信息表
Farm_Info.init(
  {
    supplierId: {
      type: INTEGER,
      allowNull: false,
      comment: "供应商ID"
    },
    farmName: {
      type: STRING,
      allowNull: false,
      comment: "农场名称"
    },
    descript: {
      type: STRING,
      allowNull: false,
      comment: "农场描述"
    },
    tags: {
      type: STRING,
      allowNull: false,
      comment: "农场标签"
    },
    totalNum: {
      type: INTEGER,
      allowNull: false,
      comment: "农场总租地数量（块）"
    },
    remainNum: {
      type: INTEGER,
      allowNull: false,
      comment: "剩余可出租的土地数量（块）"
    },
    preArea: {
      type: INTEGER,
      allowNull: false,
      comment: "每块租地面积（单位m2）"
    },
    imgCover: {
      type: STRING,
      allowNull: false,
      comment: "农场封面"
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: "农场地址"
    },
    monitor: {
      type: STRING,
      allowNull: true,
      comment: "农场直播地址"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Farm_Info;
