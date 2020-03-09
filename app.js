/**
 * @description 入口文件
 */
require("module-alias/register");
const Koa = require("koa");
const InitApp = require("@core/init");
const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);
InitApp.initCore(app);
let count = 0;
let serviceId;
// 监听与客户端的连接事件
io.on("connection", socket => {
  console.log(socket.id);
  console.log("连接了");
  // 客服上线
  socket.on("serviceLogin", msg => {
    serviceId = socket.id;
  });
  // 客服聊天功能
  socket.on("chatToService", msg => {
    console.log(`客服聊天功能${socket.id}`);
    Object.assign(msg, { socketId: socket.id });
    // 将消息转发给客服
    socket.to(serviceId).emit("service", msg);
  });
  // 客服回复用户
  socket.on("replayToClient", msg => {
    console.log(count++);
    // 将消息转给指定用户
    socket.to(msg.socketId).emit("replayFromService", msg);
  });

  // 登出
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000);
