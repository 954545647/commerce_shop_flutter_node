/**
 * @description 商品评论模型表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");

class Good_Comment extends Model {}

// 商品评论表
Good_Comment.init(
  {
    good_id: {
      type: INTEGER,
      allowNull: false,
      comment: "商品ID"
    },
    order_id: {
      type: INTEGER,
      allowNull: false,
      comment: "订单ID"
    },
    user_id: {
      type: STRING,
      allowNull: false,
      comment: "用户ID"
    },
    title: {
      type: STRING,
      allowNull: false,
      comment: "评论标题"
    },
    content: {
      type: STRING,
      allowNull: false,
      comment: "评论内容"
    },
    comment_rate: {
      type: INTEGER,
      allowNull: false,
      comment: "评论等级 0-5星"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Good_Comment;
