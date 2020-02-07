/**
 * @description success Model 数据模型
 */

class SuccessModel extends Error {
  constructor({ msg = "成功", errorCode = 0, code = 200, data = {} }) {
    super();
    this.errorCode = errorCode;
    this.msg = msg;
    this.code = code;
    this.data = data;
  }
}

module.exports = {
  SuccessModel
};
