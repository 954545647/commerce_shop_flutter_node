/**
 * @description cluster 模块
 */

const cluster = require("cluster");
const os = require("os");
if (cluster.isMaster) {
  let cpus = os.cpus().length; // cpu核数
  for (let i = 0; i < cpus / 2; i++) {
    cluster.fork();
  }
  // 检测到某个进程离开,在5秒后重启线程
  cluster.on("exit", () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  });
} else {
  require("./app");
  process.on("uncaughtException", err => {
    // 在这里捕获错误并且上报
    console.error(err);
    process.exit(1); // 退出进程
  });
  // 查看进程是否发生内存泄漏
  setInterval(() => {
    if (process.memoryUsage().rss > 734003200) {
      console.log("进程内存泄漏");
      process.exit(1);
    }
  });
}
