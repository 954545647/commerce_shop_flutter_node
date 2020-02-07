/**
 * @description 数据库配置文件
 */

const { isProd } = require("@utils/env");

let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
  family: 4, // IPV4
  // password: "auth",
  db: 0
};

let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "Xhj123456",
  port: "3306",
  datebase: "green_shop"
};

let MYSQL_CONNECT = {
  max: 5, //连接池最大的连接数量
  min: 0, // 最小的数量
  idle: 10000 // 如果连接池10s内没有被使用，释放
};

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: "127.0.0.1"
  };

  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: "localhost",
    user: "root",
    password: "Xhj123456",
    port: "3306",
    database: "green_shop"
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
  MYSQL_CONNECT
};
