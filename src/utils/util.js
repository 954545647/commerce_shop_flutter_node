/**
 * @description 工具函数
 */

/**
 * 从 Validator实例 及其 原型链上获取所有字段并筛选出要校验的字段
 * @param {instance} instance Validator实例
 */
const findFields = function(instance, { filter }) {
  /**
   * 递归函数，从实例及自身获取字段
   * @param {instance} instance
   */
  function _find(instance) {
    if (instance.__proto__ === null) return [];
    let names = Reflect.ownKeys(instance);
    names = names.filter(name => {
      return _shouldKeep(name);
    });
    return [...names, ..._find(instance.__proto__)];
  }

  /**
   * 判断该属性或方法是否符合 filter函数 的校验要求
   * @param {value} value
   */
  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true;
      }
    }
  }

  return _find(instance);
};

/**
 * 修改积分
 * @param {int} old
 * @param {int} source
 */
const changeIntegral = function(old, source) {
  if (source === 1) {
    // 签到
    return old + 1;
  } else if (source === 2) {
    // 下单
    return old + 10;
  } else if (source === 3) {
    // 评价
    return old + 5;
  } else {
    return old - Math.abs(source);
  }
};

/**
 * 修改图片路径
 * @param {string} str
 */
const cutPath = function(str) {
  str = str.toString();
  if (str.indexOf("127.0.0") != -1) {
    str = str.slice(15);
  }
  if (str.indexOf("47.96.96") != -1) {
    str = str.slice(15);
  }
  return str;
};

module.exports = {
  findFields,
  changeIntegral,
  cutPath
};
