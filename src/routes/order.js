/**
 * @description 订单路由
 */

const router = require("koa-router")();
const Auth = require("@middlewares/auth");
router.prefix("/order");
const {
  handleCarts,
  getCarts,
  updateCarts,
  newOrder,
  deleteCarts
} = require("@controller/order");
const { doAction } = require("@utils/queue");
// 操作购物车(添加、移除)
router.post("/handleCart", new Auth().token, async ctx => {
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
router.post("/deleteCart", new Auth().token, async ctx => {
  const { cartIds } = ctx.request.body;
  ctx.body = await deleteCarts(cartIds);
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

router.post("/startTask", new Auth().token, async ctx => {
  const { orderId } = ctx.request.body;
  console.log(`加入队列${orderId}`);
  if (orderId) {
    doAction(orderId);
  }
  ctx.body = {
    msg: "成功"
  };
});

// 生成订单
router.post("/new", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  const {
    // Order_Info
    couponId = null,
    orderAmount,
    payMoney,
    address,
    status = 0,
    // Order_Detail
    goodsId,
    orderUsername
  } = ctx.request.body;
  ctx.body = await newOrder({
    userId,
    couponId,
    orderAmount,
    payMoney,
    address,
    status,
    goodsId,
    orderUsername
  });
});

module.exports = router;
