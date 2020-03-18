/**
 * @description redis
 */

const redis = require("redis");
const { REDIS_CONF } = require("@config/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
  console.error("redis error", err);
});

/**
 * redis set
 * @param {string} key
 * @param {string} val
 * @param {number} timeout
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val == "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 * redis get
 * @param {string} key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (err) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};
