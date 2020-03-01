/**
 * @description sequelize 实例
 */

const Sequelize = require("sequelize");

const { MYSQL_CONF, MYSQL_CONNECT } = require("@config/db");
const { isProd, isTest } = require("@utils/env");

const { host, password, user, datebase } = MYSQL_CONF;
const conf = {
  host,
  dialect: "mysql",
  timezone: "+08:00",
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function(field, next) {
      // for reading from database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    }
  },
  logging: () => {}
};

if (isTest) {
  conf.logging = () => {};
}

// 线上环境使用连接池
if (isProd) {
  conf.pool = MYSQL_CONNECT;
}

const seq = new Sequelize(datebase, user, password, conf);

// 测试数据库连接
// seq
//   .authenticate()
//   .then(() => {
//     console.log("Connect successful!!!");
//   })
//   .catch(err => {
//     console.error("Connect Error!!!");
//   });

// 同步数据库
// seq
//   .sync({
//     force: true
//   })
//   .then(() => {
//     console.log("数据库更新sync ok");
//     process.exit();
//   });

module.exports = seq;
