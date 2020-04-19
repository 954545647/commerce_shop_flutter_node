/**
 * @description coupon Controller
 */

const {
  newCounponInfo,
  getUserCounpons,
  getCoupons,
  newCounponTakeHistory,
  updateCounponUseHistory,
  checkCouponIfTake,
  getCouponCount,
  updateCount
} = require("@services/coupon");

/**
 * 获取系统中的优惠卷
 */
async function getAllCoupons() {
  const result = await getCoupons();
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 查找用户优惠卷
 * @param {int} id
 */
async function getUserCoupon(id) {
  const result = await getUserCounpons(id);
  if (result) {
    let coupons = [];
    result.forEach(data => {
      if (
        data &&
        data.dataValues &&
        data.dataValues.Coupon_Info &&
        data.dataValues.Coupon_Info.dataValues
      ) {
        // 这里对数据进行一个处理，将合并查找的 Coupon_Info 信息提取出来(更美观)
        let couponInfo = data.dataValues.Coupon_Info.dataValues;
        Object.assign(data.dataValues, couponInfo);
        delete data.dataValues.Coupon_Info;
        coupons.push(data.dataValues);
      }
    });
    return new global.succ.SuccessModel({ data: coupons });
  } else {
    return new global.errs.newCouponFail();
  }
}

/**
 * 新增优惠卷
 * @param {string | int} param0 优惠卷信息
 */
async function newCoupon({ name, threshold, faceValue, source, count }) {
  const couponInfo = await newCounponInfo({
    name,
    source,
    threshold,
    faceValue,
    count
  });
  if (couponInfo) {
    return new global.succ.SuccessModel({ data: couponInfo });
  } else {
    return new global.errs.newCouponFail();
  }
}

/**
 * 更新优惠卷
 * @param {string | int} param0 优惠卷信息
 */
async function updateCounpon({ userId, couponId, orderId }) {
  // 传递了订单Id，则是使用优惠卷，更新信息
  const result = await updateCounponUseHistory({ userId, couponId, orderId });
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    // 优惠卷使用数据修改失败
    return new global.errs.couponUseDataWrong();
  }
}

/**
 * 领取优惠卷
 * @param {int} userId
 */
async function takeCoupon(userId, couponId) {
  // 先看是否顾客领取
  let ifTake = await CouponIfTake(userId, couponId);
  if (ifTake) {
    // 优惠卷已经领取过了
    return new global.errs.alreadyTake();
  }
  // 判断优惠劵数量
  let count = await getCouponNum(couponId);
  if (count == 0) {
    // 优惠卷数量不足
    return new global.errs.takeCouponFail();
  }
  // 新增优惠卷领取信息
  let result = await newCounponTakeHistory(userId, couponId);
  // 更新优惠卷的剩余数量
  await updateCount(couponId, count - 1);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    // 优惠卷领取失败
    return new global.errs.takeCouponFail();
  }
}

/**
 * 判断优惠卷是否获取
 * @param {int} userId
 * @param {int} couponId
 */
async function CouponIfTake(userId, couponId) {
  let ifTake = false;
  let data = await checkCouponIfTake(userId, couponId);
  if (data && data.dataValues.use_state === 0) {
    ifTake = true;
  }
  return ifTake;
}

/**
 * 获取优惠卷的剩余数量
 * @param {int} couponId
 */
async function getCouponNum(couponId) {
  let data = await getCouponCount(couponId);
  if (data && data.dataValues.count) {
    return data.dataValues.count;
  }
  return 0;
}

module.exports = {
  getUserCoupon,
  newCoupon,
  getAllCoupons,
  updateCounpon,
  takeCoupon
};
