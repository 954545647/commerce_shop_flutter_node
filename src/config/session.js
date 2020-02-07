/**
 * @description session 的配置文件
 */

const Store = require("@db/redisStore.js");
const { REDIS_CONF } = require("@config/db");

const SESSION_CONF = {
  key: "koa:sess", // cookie 键名
  maxAge: 60000, // 过期时间 默认是一天
  overwrite: true, // 是否覆盖cookie
  httpOnly: true, // 是否JS无法获取cookie
  signed: true, // 是否生成cookie的签名，防止浏览器暴力篡改
  rolling: false, // 每次访问都重新刷新时间
  renew: false, // session快过期的时候重新刷新,
  store: new Store(REDIS_CONF)
};

// 作为cookies签名时的秘钥
const SESSION_KEYS = ["REX_1119@qq"];

module.exports = {
  SESSION_KEYS,
  SESSION_CONF
};
