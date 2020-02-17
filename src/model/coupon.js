/**
 * @description 优惠卷类异常集合 12xxx
 */

const { HttpException } = require("./error");

// 优惠卷创建失败
class newCouponFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "优惠卷创建失败";
    this.errorCode = errorCode || 12001;
  }
}

// 优惠卷领取失败
class takeCouponFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "优惠卷领取失败";
    this.errorCode = errorCode || 12002;
  }
}

// 优惠卷已经领取了
class alreadyTake extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "优惠卷已经领取了";
    this.errorCode = errorCode || 12003;
  }
}

// 优惠卷使用数据修改失败
class couponUseDataWrong extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "优惠卷使用数据修改失败";
    this.errorCode = errorCode || 12004;
  }
}

module.exports = {
  newCouponFail,
  alreadyTake,
  takeCouponFail,
  couponUseDataWrong
};
