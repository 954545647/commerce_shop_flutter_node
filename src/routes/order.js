/**
 * @description 订单路由
 */

const router = require("koa-router")();
const Auth = require("@middlewares/auth");
router.prefix("/order");
const {
  newOrder,
  getAllOrders,
  modifyStatus,
  getUnpayOrders
} = require("@controller/order");
const { doAction } = require("@utils/queue");

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

// 未支付订单
router.get("/unpay", new Auth().token, async ctx => {
  ctx.body = await getUnpayOrders();
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

// 获取全部订单
router.get("/all", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  ctx.body = await getAllOrders(userId);
});

// 修改订单状态
router.post("/modify", new Auth().token, async ctx => {
  const { orderId } = ctx.request.body;
  ctx.body = await modifyStatus(orderId);
});

module.exports = router;
