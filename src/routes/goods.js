/**
 * @description 商品接口
 */
const router = require("koa-router")();
const Auth = require("@middlewares/auth");
const {
  newGood,
  getAlls,
  updateInfo,
  getGoodDetail
} = require("@controller/goods");
const { NewGoodValidator } = require("@validators/good");
router.prefix("/goods"); // 前缀

// 获取所有商品(可兼容传递id，获取该供应商id下的所有商品)
router.post("/getAlls", async ctx => {
  const { id = null } = ctx.request.body;
  ctx.body = await getAlls(id);
});

// 新增商品
router.post("/new", new Auth().token, async ctx => {
  // await new NewGoodValidator().validate(ctx);
  let {
    goodName,
    price,
    descript,
    stock,
    imgCover,
    sales = 0,
    expressCost,
    from,
    supplierId
  } = ctx.request.body;
  ctx.body = await newGood({
    goodName,
    price,
    descript,
    stock,
    imgCover,
    sales,
    expressCost,
    from,
    supplierId
  });
});

// 更新商品信息
router.post("/update", new Auth().token, async ctx => {
  const { goodInfo } = ctx.request.body;
  ctx.body = await updateInfo(goodInfo);
});

// 获取商品详细信息
router.post("/getInfo", async ctx => {
  const { goodId } = ctx.request.body;
  ctx.body = await getGoodDetail(goodId);
});

router.post("/saveId", async ctx => {
  const { goodId } = ctx.request.body;
  global.errs.goodId = goodId;
  ctx.body = {
    msg: "save ok"
  };
});

router.get("/getId", async ctx => {
  let id = global.errs.goodId || 0;
  ctx.body = id;
});

module.exports = router;
