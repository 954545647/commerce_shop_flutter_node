/**
 * @description sequelize 同步数据库
 */
const seq = require("./seq");

// 测试数据库连接
seq
  .authenticate()
  .then(() => {
    console.log("Connect successful!!!");
  })
  .catch(err => {
    console.error("Connect Error!!!");
  });

// 同步数据库
seq
  .sync({
    force: true
  })
  .then(() => {
    console.log("sync ok");
    process.exit();
  });
