/**
 * @description 用户类异常集合 11xxx
 */

const { HttpException } = require("./error");

// 注册用户名已经存在
class registerUserExist extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "用户名已经存在";
    this.errorCode = errorCode || 11001;
  }
}

// 注册失败请重试
class registerFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "注册失败请重试";
    this.errorCode = errorCode || 11002;
  }
}

// 登录失败,当前用户不存在
class userNotExit extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "登录失败,当前用户不存在";
    this.errorCode = errorCode || 11003;
  }
}

// 修改密码失败
class changePassFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "修改密码失败";
    this.errorCode = errorCode || 11004;
  }
}

// 原始密码错误
class oldPassWrong extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "原始密码错误";
    this.errorCode = errorCode || 11005;
  }
}

// 新增地址失败
class newAddressFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "新增地址失败";
    this.errorCode = errorCode || 11007;
  }
}

// 积分修改失败
class changeIntegralFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "积分修改失败";
    this.errorCode = errorCode || 11008;
  }
}

// 查询签到数据失败
class searchSignInfoFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "查询签到数据失败";
    this.errorCode = errorCode || 11009;
  }
}

// 用户密码不正确
class userPassError extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "用户密码不正确";
    this.errorCode = errorCode || 11010;
  }
}

module.exports = {
  registerUserExist,
  registerFail,
  userNotExit,
  userPassError,
  changePassFail,
  oldPassWrong,
  newAddressFail,
  changeIntegralFail,
  searchSignInfoFail
};
