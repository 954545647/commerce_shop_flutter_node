/**
 * @description socket service
 */

const { Chat_Info } = require("@db/model");
const Op = require("Sequelize").Op;
/**
 * 保存客服聊天内容
 * @param {int} param0
 */
async function saveInfo({
  fromName,
  toName,
  fromId,
  toId,
  content,
  status,
  type
}) {
  let result = await Chat_Info.create({
    fromName,
    toName,
    fromId,
    toId,
    content,
    status,
    type
  });
  return result;
}

/**
 * 获取信息
 * @param {int} id
 */
async function getMessage(id) {
  let result = await Chat_Info.findAll({
    where: {
      toId: id
    }
  });
  return result;
}

/**
 * 获取顾客和客服的聊天记录
 * @param {int} id
 */
async function getHistory(fromId, toId) {
  let result = await Chat_Info.findAll({
    where: {
      [Op.or]: [
        {
          toId: fromId,
          fromId: toId
        },
        {
          fromId: fromId,
          toId: toId
        }
      ]
    },
    order: [["createdAt", "DESC"]]
  });
  return result;
}

/**
 * 获取顾客和客服的聊天记录
 * @param {int} id
 */
async function getSerivceHistory(id) {
  let result = await Chat_Info.findAll({
    where: {
      [Op.or]: [
        {
          toId: 0,
          fromId: id
        },
        {
          fromId: 0,
          toId: id
        }
      ]
    },
    order: [["createdAt", "DESC"]],
    limit: 10
  });
  return result;
}

module.exports = {
  saveInfo,
  getMessage,
  getSerivceHistory,
  getHistory
};
