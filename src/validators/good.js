/**
 * @description 商品校验模型
 */
const { Validator, Rule } = require("@core/validator");

// 注册参数校验
class NewGoodValidator extends Validator {
  constructor() {
    super();
    this.goodName = new Rule("isLength", "商品名称长度必须在1-20之间", {
      min: 1,
      max: 20
    });
    this.price = new Rule("isLength", "商品价格长度0-20", {
      min: 1,
      max: 20
    });
    this.stock = new Rule("isInt", "商品价格范围0-10000", {
      gt: -1,
      lt: 100001
    });
    this.expressCost = this.stock;
    this.supplierId = this.stock;
    this.descript = new Rule("isLength", "商品描述长度必须在1-200之间", {
      min: 1,
      max: 200
    });
    this.from = new Rule("isLength", "商品发源地长度必须在1-30之间", {
      min: 1,
      max: 30
    });
  }
}

module.exports = {
  NewGoodValidator
};
