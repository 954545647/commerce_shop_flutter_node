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

module.exports = {
  findFields
};
