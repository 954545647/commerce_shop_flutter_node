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
  modifyCounpon
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
  const { name, type, with_amount, used_amount } = ctx.request.body;
  ctx.body = await newCoupon({
    name,
    type,
    with_amount,
    used_amount
  });
});

// 处理优惠卷
// 默认是领取优惠卷，orderId 为空，使用情况为 0
router.post("/handleCoupon", new Auth().token, async ctx => {
  const { couponId, orderId = null, use_state = 0 } = ctx.request.body;
  const userId = ctx.auth.id;
  ctx.body = await modifyCounpon({
    userId,
    couponId,
    orderId,
    use_state
  });
});

module.exports = router;
