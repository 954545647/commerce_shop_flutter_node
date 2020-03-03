/**
 * @description coupon service
 */

const { Coupon_Info, Coupon_History } = require("@db/model");

/**
 * 查找数据库中的所有优惠卷
 */
async function getCoupons() {
  // 联合查询
  const result = await Coupon_Info.findAll();
  return result;
}

/**
 * 查找用户优惠卷
 * @param {int} id 用户id
 */
async function getUserCounpons(id) {
  // 查询
  const result = await Coupon_History.findAll({
    where: {
      userId: id
    },
    // 联合查询，将用户领取或使用的优惠卷的劵本体信息查询出来
    include: [
      {
        model: Coupon_Info,
        attributes: ["name", "type", "with_amount", "used_amount"]
      }
    ]
  });
  // 返回的是一个数组
  return result;
}

/**
 * 新增优惠卷
 * @param {sting|int} param0 优惠卷信息
 */
async function newCounponInfo({ name, type, with_amount, used_amount }) {
  // 查询
  const result = await Coupon_Info.create({
    name,
    type,
    with_amount,
    used_amount
  });
  return result;
}

/**
 * 查看优惠卷领取情况
 * @param {int} id 用户id
 * @param {int} couponId 优惠卷id
 */
async function checkCouponIfTake(userId, couponId) {
  const result = await Coupon_History.findOne({
    where: {
      userId,
      couponId
    }
  });
  return result;
}

/**
 * 更新优惠卷使用历史信息
 * @param {int} id 用户id
 * @param {int} couponId 优惠卷id
 * @param {int} orderId 订单id
 */
async function updateCounponUseHistory({ userId, couponId, orderId }) {
  let result;
  console.log(userId, couponId, orderId);
  result = await Coupon_History.update(
    {
      use_state: 1,
      orderId
    },
    {
      where: {
        userId,
        couponId
      }
    }
  );
  return result;
}

/**
 * 新增优惠卷使用历史信息
 * @param {int} param0 id信息
 */
async function newCounponTakeHistory(userId, couponId) {
  let result;
  result = await Coupon_History.create({
    userId,
    couponId
  });
  return result;
}

module.exports = {
  getCoupons,
  getUserCounpons,
  newCounponInfo,
  newCounponTakeHistory,
  updateCounponUseHistory,
  checkCouponIfTake
};
