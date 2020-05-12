/**
 * @description 初始化socket
 */
const socketIo = require("socket.io");
const { saveInfo } = require("@services/socket");
const { MessageInfo } = require("@model/socket");

module.exports = appSocket = server => {
  const io = socketIo(server);
  let servicerId = null; // 客服人员
  let clientsForService = {}; // 当前咨询客服的顾客数据
  let suppliers = {}; // 当前在线的商家数据
  let clientsForSupplier = {}; // 当前咨询商家的顾客数据

  // 监听与客户端的连接事件
  io.on("connection", socket => {
    console.log(`connection接通连接${socket.id}`);

    // 客服上线
    socket.on("serviceLogin", () => {
      servicerId = socket.id;
      console.log(`客服${socket.id}上线了`);
      for (let client in clientsForService) {
        io.to(clientsForService[client]).emit(
          "replayFromService",
          new MessageInfo({
            content: `你好我是客服${servicerId}`,
            username: "系统",
            type: 1
          })
        );
      }
    });

    // 商家上线
    socket.on("supplierLogin", msg => {
      // 记录商家信息
      suppliers[msg.fromId] = {
        socketId: socket.id,
        username: msg.fromName
      };
      printDetail(servicerId, clientsForService, suppliers, clientsForSupplier);
      for (let client in clientsForSupplier) {
        io.to(clientsForSupplier[client]).emit(
          "replayFromSupplier",
          new MessageInfo({
            content: `你好,我是商家${msg.fromName}`,
            fromName: msg.fromName,
            type: 1
          })
        );
      }
    });

    // 监听客户咨询客服服务
    socket.on("startForService", async msg => {
      console.log(msg);
      // 记录当前咨询聊天用户
      clientsForService[msg.fromId] = socket.id;
      printDetail(servicerId, clientsForService, suppliers, clientsForSupplier);
      // 客服上线
      if (servicerId) {
        sendServiceLogin(socket, servicerId);
      } else {
        // 客服未在线
        sendServiceNotExit(socket);
      }
    });

    // 监听客户咨询商家服务
    socket.on("startForSupplier", async msg => {
      // 记录当前咨询商家的用户
      clientsForSupplier[msg.fromId] = socket.id;
      printDetail(servicerId, clientsForService, suppliers, clientsForSupplier);
      // 商家上线
      if (suppliers[msg.toId]) {
        sendSupplierLogin(socket, suppliers[msg.toId].username);
      } else {
        // 商家未在线
        // sendSupplierNotExit(socket);
      }
    });

    // 客服聊天功能（顾客 to 客服）
    socket.on("chatToService", async msg => {
      let message = {
        fromName: msg.fromName,
        fromId: msg.fromId,
        content: msg.content,
        status: servicerId ? 1 : 0,
        toId: 0,
        toName: "系统",
        type: 0
      };
      if (!servicerId) {
        // 客服未在线
        sendServiceNotExit(socket);
      }
      // 将消息转发给客服
      socket.to(servicerId).emit("service", message);
      // 将客户的信息保存进数据库
      await saveInfo(message);
    });

    // 商家聊天功能（顾客 to 商家）
    socket.on("chatToSupplier", async msg => {
      let supplier = suppliers[msg.toId];
      // 构造聊天内容
      let message = {
        fromName: msg.fromName,
        fromId: msg.fromId,
        content: msg.content,
        status: supplier ? 1 : 0,
        toId: msg.toId,
        toName: msg.toName,
        type: 0
      };
      // 商家未在线
      if (!supplier) {
        // sendSupplierNotExit(socket);
      } else {
        // 将消息转发给商家
        socket.to(supplier.socketId).emit("supplier", message);
      }
      // 将客户的信息保存进数据库
      await saveInfo(message);
    });

    // 客服回复用户
    socket.on("replayToClient", async msg => {
      let message = {
        fromName: "系统",
        toName: msg.toName,
        content: msg.content,
        status: servicerId ? 1 : 0,
        toId: msg.toId,
        fromId: 0,
        type: 1
      };
      await saveInfo(message);
      // 将消息转给指定用户
      socket.to(clientsForService[msg.toId]).emit("replayFromService", message);
    });

    // 商家回复用户
    socket.on("SreplayToClient", async msg => {
      let message = {
        fromName: msg.fromName,
        content: msg.content,
        status: servicerId ? 1 : 0,
        toId: msg.toId,
        fromId: msg.fromId,
        type: 1,
        toName: msg.toName
      };
      await saveInfo(message);
      // 将消息转给指定用户
      socket
        .to(clientsForSupplier[msg.toId])
        .emit("replayFromSupplier", message);
    });

    // 商家下线，不再回复顾客
    socket.on("SnosreplayToClient", async msg => {
      delete suppliers[msg.id];
    });

    // 顾客离开，不再和商家聊天
    socket.on("nochatToSupplier", async msg => {
      delete clientsForSupplier[msg.id];
    });

    // 登出
    socket.on("disconnect", () => {
      console.log(`disconnect断开连接------${socket.id}`);
      // 判断是否是客服下线
      if (socket.id == servicerId) {
        console.log(`客服${socket.id}下线了`);
        servicerId = null;
      }
      // 判断是否是商家下线
      for (let i in suppliers) {
        if (suppliers[i].socketId == socket.id) {
          console.log(`商家${suppliers[i].username}下线了`);
          delete suppliers[i];
        }
      }
    });
  });
};

// 输出当前状态
function printDetail(
  servicerId,
  clientsForService,
  suppliers,
  clientsForSupplier
) {
  console.log("\n");
  console.log(`当前在线客服${servicerId}`);
  console.log(`当前在线咨询客服顾客${JSON.stringify(clientsForService)}`);
  console.log(`当前在线商家${JSON.stringify(suppliers)}`);
  console.log(`当前在线咨询商家顾客${JSON.stringify(clientsForSupplier)}`);
  console.log("\n");
}

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
      fromName: "客服",
      type: 1
    })
  );
}

// 发送商家未在线消息
function sendSupplierNotExit(socket) {
  let replyList = [
    "商家暂时未在线，请稍后尝试",
    "商家正在路上，你稍等",
    "可以尝试回复'呼叫商家'"
  ];
  let i = Math.floor(Math.random() * 3);
  // 商家未在线
  socket.emit(
    "replayFromSupplier",
    new MessageInfo({
      content: replyList[i],
      fromName: "商家",
      type: 1
    })
  );
}

// 发送客服上线
function sendServiceLogin(socket, servicerId) {
  socket.emit(
    "replayFromService",
    new MessageInfo({
      content: `你好我是客服${servicerId}`,
      fromName: "系统",
      type: 1
    })
  );
}

// 发送商家上线
function sendSupplierLogin(socket, supplierName) {
  socket.emit(
    "replayFromSupplier",
    new MessageInfo({
      content: `你好我是商家${supplierName}`,
      fromName: "商家",
      type: 1
    })
  );
}
