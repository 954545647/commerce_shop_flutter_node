/**
 * @description socket Controller
 */

const {
  getMessage,
  getSerivceHistory,
  getHistory
} = require("@services/socket");

/**
 * 获取商家信息
 * @param {int} id
 */
async function getSupplierMessage(id) {
  let result = await getMessage(id);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 获取顾客和客服的聊天记录
 * @param {int} id
 */
async function getClientServiceHistory(id) {
  let result = await getSerivceHistory(id);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 获取顾客和商家的聊天记录
 * @param {int} id
 */
async function getClientSupplierHistory(fromId, toId) {
  let result = await getHistory(fromId, toId);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

module.exports = {
  getSupplierMessage,
  getClientServiceHistory,
  getClientSupplierHistory
};
