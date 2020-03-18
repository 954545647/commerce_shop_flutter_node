/**
 * @description 工具路由
 */

const router = require("koa-router")();
const path = require("path"); //路径管理
const fs = require("fs"); //路径管理
const Auth = require("@middlewares/auth");
router.prefix("/utils");
const { doAction } = require("@utils/queue");
const { refreshToken } = require("@controller/user");

// 开启延时任务
router.post("/startTask", new Auth().token, async ctx => {
  const { orderId } = ctx.request.body;
  if (orderId) {
    doAction(orderId);
  }
  ctx.body = {
    msg: "成功"
  };
});

// 文件上传
router.post("/upload", async ctx => {
  const file = ctx.request.files.file;
  // 接收到文件之后，我们需要把文件保存到目录中，返回一个 url 给前端
  const basename = path.basename(file.path);
  const reader = fs.createReadStream(file.path); // 创建可读流
  const ext = file.name.split(".").pop(); // 获取上传文件扩展名
  const staticPath = path.join(__dirname, "../static");
  const upStream = fs.createWriteStream(`${staticPath}/${basename}.${ext}`); // 创建可写流
  reader.pipe(upStream); // 可读流通过管道写入可写流
  ctx.body = { url: `${BASEURL}/${basename}.${ext}` };
});

// 刷新token路由
router.post("/getRefreshToken", new Auth().token, async ctx => {
  const id = ctx.auth.id;
  ctx.body = await refreshToken(id);
});

module.exports = router;
