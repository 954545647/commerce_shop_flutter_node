/**
 * @description 特定类型的异常集合
 */

// 服务器异常
class HttpException extends Error {
  constructor(msg = "服务器异常", errorCode = 10000, code = 400) {
    super();
    this.errorCode = errorCode;
    this.msg = msg;
    this.code = code;
  }
}

// 参数异常
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "参数错误";
    this.errorCode = errorCode || 10000;
  }
}

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

class loginFailInfo extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "登录失败";
    this.errorCode = errorCode || 10003;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  registerUserExist,
  registerFailInfo,
  loginFailInfo
};
