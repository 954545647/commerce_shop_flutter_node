/**
 * @description 商家接口
 */
const router = require("koa-router")();
router.prefix("/supplier"); // 前缀
const Auth = require("@middlewares/auth");
const { UserNameValidator } = require("@validators/user");
const {
  getSuppliersInfo,
  newSupplier,
  registerLogin,
  getSupplierInfoById,
  getSupplierByGoodId,
  getSupplierFarm,
  getSupplierGood,
  getSupplierOrder,
  registerExit,
  getSupplierMessage
} = require("@controller/supplier");

// 新增供应商
router.post("/register", async ctx => {
  const {
    username,
    password,
    phone,
    idNum,
    frontImg,
    backImg,
    imgCover
  } = ctx.request.body;
  ctx.body = await newSupplier({
    username,
    password,
    phone,
    idNum,
    frontImg,
    backImg,
    imgCover
  });
});

// 商家登录
router.post("/login", async ctx => {
  const { username, password } = ctx.request.body;
  ctx.body = await registerLogin(username, password);
});

// 商家是否已经存在
router.post("/ifExit", async ctx => {
  await new UserNameValidator().validate(ctx);
  const { username } = ctx.request.body;
  ctx.body = await registerExit(username);
});

// 获取商家数据
router.post("/getSupplierInfo", new Auth().token, async ctx => {
  let id;
  if (ctx.request.body && ctx.request.body.id) {
    id = ctx.request.body.id;
  } else {
    id = ctx.auth.id;
  }
  ctx.body = await getSupplierInfoById(id);
});

// 获取全部商家信息
router.get("/getAll", new Auth().token, async ctx => {
  ctx.body = await getSuppliersInfo();
});

// 通过商家id获取单个商家信息
router.post("/getSupplierById", async ctx => {
  const { id } = ctx.request.body;
  ctx.body = await getSupplierInfoById(id);
});

// 通过商品id获取单个商家信息
router.post("/getSupplierByGoodId", async ctx => {
  const { goodId } = ctx.request.body;
  ctx.body = await getSupplierByGoodId(goodId);
});

// 获取商家的发布的商品
router.post("/goods", new Auth().token, async ctx => {
  const { id } = ctx.request.body; // 商家id
  ctx.body = await getSupplierGood(id);
});

// 获取商家发布的农场
router.post("/farms", new Auth().token, async ctx => {
  const { id } = ctx.request.body;
  ctx.body = await getSupplierFarm(id);
});

// 获取商家的全部订单
router.post("/orders", new Auth().token, async ctx => {
  const { supplierId } = ctx.request.body;
  ctx.body = await getSupplierOrder(supplierId);
});

// 获取商家的全部消息
router.post("/message", new Auth().token, async ctx => {
  const supplierId = ctx.auth.id;
  ctx.body = await getSupplierMessage(supplierId);
});

module.exports = router;
