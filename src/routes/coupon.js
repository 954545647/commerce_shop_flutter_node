/**
 * @description 优惠卷路由
 */
const router = require("koa-router")();
const Auth = require("@middlewares/auth");
router.prefix("/coupon"); // 前缀
const {
  getUserCoupon,
  newCoupon,
  getAllCoupons,
  updateCounpon,
  takeCoupon
} = require("@controller/coupon");

// 查找所有优惠卷
router.post("/getAlls", new Auth().token, async ctx => {
  ctx.body = await getAllCoupons();
});

// 查找用户优惠卷
router.post("/myCoupon", new Auth().token, async ctx => {
  const id = ctx.auth.id;
  ctx.body = await getUserCoupon(id);
});

// 新增优惠卷
router.post("/new", new Auth().token, async ctx => {
  const { name, threshold, faceValue, count } = ctx.request.body;
  const id = ctx.auth.id;
  ctx.body = await newCoupon({
    name,
    source: id,
    threshold,
    faceValue,
    count
  });
});

// 修改优惠卷
router.post("/handleCoupon", new Auth().token, async ctx => {
  const { couponId, orderId = null } = ctx.request.body;
  const userId = ctx.auth.id;
  ctx.body = await updateCounpon({
    userId,
    couponId,
    orderId
  });
});

// 领取优惠卷
router.post("/take", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  const { couponId } = ctx.request.body;
  ctx.body = await takeCoupon(userId, couponId);
});

module.exports = router;
