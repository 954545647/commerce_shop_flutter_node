/**
 * @description coupon Controller
 */

const {
  newCounponInfo,
  getUserCounpons,
  getCoupons,
  newCounponTakeHistory,
  updateCounponUseHistory,
  checkCouponIfTake
} = require("@services/coupon");

/**
 * 获取系统中的优惠卷
 */
async function getAllCoupons() {
  const result = await getCoupons();
  if (result) {
    // let coupons = [];
    // result.forEach(data => {
    //   if (
    //     data &&
    //     data.dataValues &&
    //     data.dataValues.Coupon_Info &&
    //     data.dataValues.Coupon_Info.dataValues
    //   ) {
    //     // 这里对数据进行一个处理，将合并查找的 Coupon_Info 信息提取出来(更美观)
    //     let couponInfo = data.dataValues.Coupon_Info.dataValues;
    //     Object.assign(data.dataValues, couponInfo);
    //     delete data.dataValues.Coupon_Info;
    //     coupons.push(data.dataValues);
    //   }
    // });
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
async function newCoupon({ name, with_amount, used_amount, type = 0 }) {
  const couponInfo = await newCounponInfo({
    name,
    type,
    with_amount,
    used_amount
  });
  if (couponInfo) {
    return new global.succ.SuccessModel({ data: couponInfo });
  } else {
    return new global.errs.newCouponFail();
  }
}

/**
 * 操作优惠卷
 * @param {string | int} param0 优惠卷信息
 */
async function modifyCounpon({ userId, couponId, orderId }) {
  // 传递了订单Id，则是使用优惠卷，更新信息
  if (orderId) {
    const result = await updateCounponUseHistory({ userId, couponId, orderId });
    if (result) {
      return new global.succ.SuccessModel({ data: result });
    } else {
      // 优惠卷使用数据修改失败
      return new global.errs.couponUseDataWrong();
    }
  } else {
    // 新增优惠卷领取信息
    // 首先判断优惠卷是否被领取
    let ifTake = await checkCouponIfTake(userId, couponId);
    if (ifTake && ifTake.dataValues.use_state === 0) {
      // 优惠卷已经领取过了
      return new global.errs.alreadyTake();
    } else {
      // 新增优惠卷领取信息
      let result = await newCounponTakeHistory(userId, couponId);
      if (result) {
        return new global.succ.SuccessModel({ data: result });
      } else {
        // 优惠卷领取失败
        return new global.errs.takeCouponFail();
      }
    }
  }
}

module.exports = {
  getUserCoupon,
  newCoupon,
  getAllCoupons,
  modifyCounpon
};
