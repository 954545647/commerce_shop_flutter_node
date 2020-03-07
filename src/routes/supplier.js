/**
 * @description 商家接口
 */
const router = require("koa-router")();
const path = require("path"); //路径管理
const fs = require("fs"); //路径管理
const { BASEURL } = require("@config");
router.prefix("/supplier"); // 前缀

const {
  getSuppliersInfo,
  newSupplier,
  registerLogin,
  getSupplierInfoById
} = require("@controller/supplier");

// 新增供应商
router.post("/register", async ctx => {
  const {
    username,
    password,
    phone,
    idNum,
    frontImg,
    backImg
  } = ctx.request.body;
  ctx.body = await newSupplier({
    username,
    password,
    phone,
    idNum,
    frontImg,
    backImg
  });
});

// 商家登录
router.post("/login", async ctx => {
  const { username, password } = ctx.request.body;
  ctx.body = await registerLogin(username, password);
});

// 获取供应商数据
router.get("/getAll", async ctx => {
  ctx.body = await getSuppliersInfo();
});

// 获取供应商数据
router.post("/getSupplierById", async ctx => {
  const { goodId = null, supplierId = null } = ctx.request.body;
  ctx.body = await getSupplierInfoById(goodId, supplierId);
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

module.exports = router;
