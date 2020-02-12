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

// 查询数据失败
class searchInfoFail extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || "查询数据失败";
    this.errorCode = errorCode || 9999;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  searchInfoFail
};
