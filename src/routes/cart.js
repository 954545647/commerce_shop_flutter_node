/**
 * @description 购物车路由
 */

const router = require("koa-router")();
const Auth = require("@middlewares/auth");
router.prefix("/cart");
const {
  handleCarts,
  getCarts,
  updateCarts,
  deleteCarts
} = require("@controller/cart");

// 操作购物车(添加、移除)
router.post("/handle", new Auth().token, async ctx => {
  const { goodId, goodName, price, count, expressCost } = ctx.request.body;
  const userId = ctx.auth.id;
  ctx.body = await handleCarts({
    userId,
    goodId,
    goodName,
    price,
    count,
    expressCost
  });
});

// 删除购物车
router.post("/delete", new Auth().token, async ctx => {
  const { cartIds } = ctx.request.body;
  ctx.body = await deleteCarts(cartIds);
});

// 修改购物车当前商品数量
router.post("/update", new Auth().token, async ctx => {
  const { count, goodId } = ctx.request.body;
  const userId = ctx.auth.id;
  ctx.body = await updateCarts(userId, goodId, count);
});

// 查看购物车
router.post("/getAlls", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  const { goodId } = ctx.request.body;
  ctx.body = await getCarts(userId, goodId);
});

module.exports = router;
