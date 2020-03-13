/**
 * @description 订单路由
 */

const router = require("koa-router")();
router.prefix("/socket");
const path = require("path");
const fs = require("fs");
const Auth = require("@middlewares/auth");
const {
  getSupplierMessage,
  getClientServiceHistory,
  getClientSupplierHistory
} = require("@controller/socket");
// 模拟客服
router.get("/", async ctx => {
  ctx.response.type = "html";
  const temp = path.join(__dirname, "../", "views/service.html");
  ctx.response.body = fs.createReadStream(temp);
});

// 模拟客户端
router.get("/client", async ctx => {
  ctx.response.type = "html";
  const temp = path.join(__dirname, "../", "views/client.html");
  ctx.response.body = fs.createReadStream(temp);
});

// 模拟商家
router.get("/supplier", async ctx => {
  ctx.response.type = "html";
  const temp = path.join(__dirname, "../", "views/supplier.html");
  ctx.response.body = fs.createReadStream(temp);
});

// 获取商家收到信息
router.post("/sMessage", async ctx => {
  const { id } = ctx.request.body;
  ctx.body = await getSupplierMessage(id);
});

router.post("/supplierHistory", new Auth().token, async ctx => {
  const { fromId, toId } = ctx.request.body;
  ctx.body = await getClientSupplierHistory(fromId, toId);
});

// 获取顾客和客服的聊天记录
router.post("/servicerHistory", new Auth().token, async ctx => {
  const { id } = ctx.request.body;
  ctx.body = await getClientServiceHistory(id);
});

module.exports = router;
