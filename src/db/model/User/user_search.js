/**
 * @description 用户搜索历史
 */
const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class User_Search extends Model {}

// 用户地址
User_Search.init(
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "用户ID"
    },
    content: {
      type: STRING,
      allowNull: false,
      comment: "查询内容"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = User_Search;
