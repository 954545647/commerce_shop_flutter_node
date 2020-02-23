/**
 * @description 订单错误集合类 13xxx
 */

const { HttpException } = require("./error");

// 优惠卷创建失败
class createOrderFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "订单创建失败";
    this.errorCode = errorCode || 13001;
  }
}

module.exports = {
  createOrderFail
};
