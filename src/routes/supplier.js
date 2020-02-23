/**
 * @description 商家接口
 */
const router = require("koa-router")();
router.prefix("/supplier"); // 前缀
const {
  getSuppliersInfo,
  newSupplier,
  getSupplierInfoById
} = require("@controller/supplier");

// 新增供应商
router.post("/new", async ctx => {
  const { name, phone, address, cover } = ctx.request.body;
  ctx.body = await newSupplier({ name, phone, address, cover });
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

module.exports = router;
