/**
 * @description 用户类异常集合
 */

const { HttpException } = require("./error");

// 注册用户名已经存在
class registerUserExist extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "用户名已经存在";
    this.errorCode = errorCode || 10001;
  }
}

// 注册失败请重试
class registerFailInfo extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "注册失败请重试";
    this.errorCode = errorCode || 10002;
  }
}

// 登录失败
class loginFailInfo extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "登录失败";
    this.errorCode = errorCode || 10003;
  }
}

// 修改密码失败
class changePassFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "修改密码失败";
    this.errorCode = errorCode || 10004;
  }
}

// 原始密码错误
class oldPassWrong extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "原始密码错误";
    this.errorCode = errorCode || 10005;
  }
}

// 登录失败
class Forbidden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "登录失败";
    this.errorCode = errorCode || 10006;
  }
}

// 新增地址失败
class newAddressFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "新增地址失败";
    this.errorCode = errorCode || 10007;
  }
}

// 积分修改失败
class changeIntegralFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "积分修改失败";
    this.errorCode = errorCode || 10008;
  }
}

// 查询签到数据失败
class searchSignInfoFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "查询签到数据失败";
    this.errorCode = errorCode || 10009;
  }
}

module.exports = {
  registerUserExist,
  registerFailInfo,
  loginFailInfo,
  changePassFail,
  oldPassWrong,
  Forbidden,
  newAddressFail,
  changeIntegralFail,
  searchSignInfoFail
};
