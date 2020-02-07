/**
 * @description Redis Store
 */
const Redis = require("ioredis");

class RedisStore {
  constructor(redisConfig) {
    this.redis = new Redis(redisConfig);
  }
  async get(key) {
    const data = await this.redis.get(`SESSION:${key}`);
    return JSON.parse(data);
  }

  async set(key, sess, maxAge) {
    await this.redis.set(
      `SESSION:${key}`,
      JSON.stringify(sess),
      // EX 表示设置键的过期时间是 秒
      // PX 代表是毫秒
      "PX",
      maxAge
    );
  }

  async destroy(key) {
    await this.redis.destroy(`SESSION:${key}`);
  }
}

module.exports = RedisStore;
