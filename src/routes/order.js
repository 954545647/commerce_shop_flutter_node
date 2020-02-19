/**
 * @description 订单路由
 */

const router = require("koa-router")();
const Auth = require("@middlewares/auth");
router.prefix("/order");
const { handleCarts, getCarts, updateCarts } = require("@controller/order");

// 操作购物车(添加、移除)
router.post("/handleCart", new Auth().token, async ctx => {
  const { goodId, goodName, price, count, expressCount } = ctx.request.body;
  const userId = ctx.auth.id;
  ctx.body = await handleCarts({
    userId,
    goodId,
    goodName,
    price,
    count,
    expressCount
  });
});

// 修改购物车当前商品数量
router.post("/updateCarts", new Auth().token, async ctx => {
  const { count, goodId } = ctx.request.body;
  const userId = ctx.auth.id;
  ctx.body = await updateCarts(userId, goodId, count);
});

// 查看购物车
router.post("/getCarts", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  const { goodId } = ctx.request.body;
  ctx.body = await getCarts(userId, goodId);
});

module.exports = router;
