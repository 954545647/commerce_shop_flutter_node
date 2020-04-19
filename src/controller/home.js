/**
 * @description 首页 controller
 */

const axios = require("axios");

/**
 * 获取用户的购物车
 * @param {int} userId 用户id
 * @param {int} goodId 商品id
 */
async function getWeather() {
  let result = await axios.get(
    "https://tianqiapi.com/api?version=v1&appid=85861573&appsecret=DEayWu5Y"
  );
  if (result) {
    return new global.succ.SuccessModel({
      data: result.data
    });
  } else {
    // 查找失败
    return new global.errs.searchInfoFail();
  }
}

module.exports = {
  getWeather
};
