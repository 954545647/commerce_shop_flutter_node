/**
 * @description 聊天记录表
 */

const seq = require("@db/seq");
const { Model } = require("sequelize");
const { STRING, INTEGER } = require("@config/types");
class Chat_Info extends Model {}

// 聊天消息表
Chat_Info.init(
  {
    fromName: {
      type: STRING,
      allowNull: true,
      defaultValue: "系统",
      comment: "发消息人名"
    },
    toName: {
      type: STRING,
      allowNull: true,
      defaultValue: "系统",
      comment: "收消息人名"
    },
    fromId: {
      type: INTEGER,
      defaultValue: 0,
      comment: "发消息人id: 0代表客服"
    },
    toId: {
      type: INTEGER,
      defaultValue: 0,
      comment: "收消息人id: 0代表客服"
    },
    content: {
      type: STRING,
      allowNull: false,
      comment: "消息内容"
    },
    status: {
      type: INTEGER,
      defaultValue: 0,
      comment: "是否已读，0未读，1已读"
    },
    type: {
      type: INTEGER,
      defaultValue: 0,
      comment: "发送方，0顾客，1：商家、客服"
    }
  },
  {
    sequelize: seq
  }
);

module.exports = Chat_Info;
