/**
 * @description 农场作物关联模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { INTEGER } = require("@config/types");

class Farm_Crop extends Model {}

// 农场-作物表
Farm_Crop.init(
  {
    farmId: {
      type: INTEGER,
      allowNull: false,
      comment: "农场ID"
    },
    cropId: {
      type: INTEGER,
      allowNull: false,
      comment: "农作物ID"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Farm_Crop;
