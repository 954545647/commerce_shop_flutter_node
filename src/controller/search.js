/**
 * @description 搜索 controller
 */

const {
  getHistorySearch,
  addHistorySearch,
  searchByKeyWord,
  getLatestHistorySearch,
  deleteHistorySearch
} = require("@services/search");

/**
 * 获取历史搜索记录
 * @param {string} query
 */
async function getUserHistorySearch(id) {
  let result = await getHistorySearch(id);
  if (result) {
    return new global.succ.SuccessModel({
      data: result
    });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 新增顾客历史搜索记录
 * @param {string} query
 * @param {int} id
 */
async function newUserHistorySearch(id, query) {
  let history = await getLatestHistorySearch(id);
  let shouldNew = true;
  if (history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      if (history[i].dataValues.content == query) {
        let cur = history[i].dataValues;
        shouldNew = false;
        await deleteHistorySearch(cur.id, cur.userId);
      }
    }
  }
  await addHistorySearch(id, query);
  if (shouldNew) {
    return new global.succ.SuccessModel("更新成功");
  } else {
    return new global.errs.createInfoFail();
  }
}

/**
 * 搜索
 * @param {string} query
 */
async function searchResByKeyWord(query) {
  let result = await searchByKeyWord(query);
  if (result) {
    return new global.succ.SuccessModel({
      data: result
    });
  } else {
    return new global.errs.searchInfoFail();
  }
}

module.exports = {
  getUserHistorySearch,
  newUserHistorySearch,
  searchResByKeyWord
};
