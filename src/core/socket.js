/**
 * @description 初始化socket
 */
const socketIo = require("socket.io");
const { saveInfo, getSerivceHistory } = require("@services/socket");
const { MessageInfo } = require("@model/socket");

// 发送客服未在线消息
function sendServiceNotExit(socket) {
  let replyList = [
    "客服暂时未在线，请稍后尝试",
    "客服正在路上，你稍等",
    "可以尝试回复'人工客服'"
  ];
  let i = Math.floor(Math.random() * 3);
  // 客服未在线
  socket.emit(
    "replayFromService",
    new MessageInfo({
      content: replyList[i],
      username: "系统"
    })
  );
}

// 客服上线
function sendServiceLogin(socket, servicerId) {
  socket.emit(
    "replayFromService",
    new MessageInfo({
      content: `你好我是客服${servicerId}`,
      username: "系统"
    })
  );
}

module.exports = appSocket = server => {
  const io = socketIo(server);
  let servicerId; // 客服人员
  let clients = {}; // 当前调用客服的顾客数据

  // 监听与客户端的连接事件
  io.on("connection", socket => {
    // 客服上线
    socket.on("serviceLogin", () => {
      servicerId = socket.id;
      console.log(`客服${socket.id}上线了`);
      for (let client in clients) {
        io.to(clients[client]).emit(
          "replayFromService",
          new MessageInfo({
            content: `你好我是客服${servicerId}`,
            username: "系统"
          })
        );
      }
    });

    // 监听客户调用客服服务
    socket.on("startForService", async msg => {
      // 记录当前调用聊天用户
      clients[msg.fromId] = socket.id;
      console.log(
        `顾客${socket.id}上线了，当前在线人员${JSON.stringify(clients)}`
      );
      // 客服上线
      if (servicerId) {
        sendServiceLogin(socket, servicerId);
      } else {
        // 客服未在线
        sendServiceNotExit(socket);
      }
    });

    // 客服聊天功能
    socket.on("chatToService", async msg => {
      if (!servicerId) {
        // 客服未在线
        sendServiceNotExit(socket);
      }
      // 将客户的信息保存进数据库
      let message = {
        username: msg.username,
        fromId: msg.fromId,
        content: msg.content,
        socketId: msg.socketId,
        status: servicerId ? 1 : 0,
        toId: msg.toId
      };
      await saveInfo(message);
      // 将消息转发给客服
      socket.to(servicerId).emit("service", message);
    });

    // 客服回复用户
    socket.on("replayToClient", async msg => {
      let message = {
        username: msg.username,
        content: msg.content,
        socketId: msg.socketId,
        status: servicerId ? 1 : 0,
        toId: msg.toId
      };
      await saveInfo(message);
      // 将消息转给指定用户
      socket.to(msg.socketId).emit("replayFromService", message);
    });

    // 登出
    socket.on("disconnect", () => {
      console.log(socket.id);
      if (socket.id == servicerId) {
        console.log(`客服${socket.id}下线了`);
        servicerId = null;
      }
    });
  });
};
