/**
 * @description 订单路由
 */

const router = require("koa-router")();
router.prefix("/socket");
const path = require("path");
const fs = require("fs");
router.get("/", async ctx => {
  ctx.response.type = "html";
  const temp = path.join(__dirname, "../", "views/socket.html");
  ctx.response.body = fs.createReadStream(temp);
});

module.exports = router;
