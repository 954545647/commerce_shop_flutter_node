/**
 * @description 商品接口
 */
const router = require("koa-router")();
const Auth = require("@middlewares/auth");
const { newGood, getAlls, newSupplier } = require("@controller/goods");
const { NewGoodValidator } = require("@validators/good");
router.prefix("/goods"); // 前缀

// 获取所有商品(可兼容传递id，获取该供应商id下的所有商品)
router.post("/getAlls", async ctx => {
  const { id = null } = ctx.request.body;
  ctx.body = await getAlls(id);
});

// 新增商品
router.post("/new", new Auth().token, async ctx => {
  await new NewGoodValidator().validate(ctx);
  let {
    goodName,
    price,
    descript,
    stock,
    imgCover = "",
    sales,
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

// 新增供应商
router.post("/newSupplier", async ctx => {
  const { name, phone, address } = ctx.request.body;
  ctx.body = await newSupplier({ name, phone, address });
});

module.exports = router;
