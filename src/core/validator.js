/**
 * @description 参数自动化校验
 */
const validator = require("validator");
const { get, last, set, cloneDeep } = require("loadsh");
const { findFields } = require("@utils/util");

/**
 * 1、找出所有需要校验的字符和自定义规则函数
 *    const v = await new RegisterValidator().validate(ctx)
 *    1. 通过ctx去获取全部参数，并深拷贝一份 Validator实例 上
 *    2. 要查找一个实例上的所有属性和方法，需要递归原型查找
 *    3. 将要检验的字段和自定义规则保存到一个数组里
 *
 * 2、将找出的所有数据进行一一校验
 *    1. 对筛选出来的数据进行一一校验
 *    2. 只要有一个校验失败就直接抛出异常让全局异常捕获
 *
 * 3、校验的方法使用 validator.js 去校验
 *    1. 步骤2校验时的一条条规则是通过 validator.js 去校验
 *    2. 校验的时候要区分是自定义规则还是常规字段
 *
 * 4、最终直接返回this
 *    1. 在ctx.check 上挂载 this实例
 */

class Validator {
  constructor() {
    this.data = {};
    this.parsed = {};
  }

  /**
   * Validator实例的get方法，返回前端传递的参数
   * @param {String} path 查找路径
   * @param {Boolean} parsed 是否自动转换，默认true
   * let v = await new RegisterValidator().validate(ctx);
   * console.log(v.get("body.age"));
   */
  get(path, parsed = true) {
    if (parsed) {
      const value = get(this.parsed, path, null);
      // 对于可选属性并且传递了默认值的
      if (value == null) {
        const keys = path.split(".");
        const key = last(keys);
        return get(this.parsed.default, key);
      }
      return value;
    } else {
      return get(this.data, path);
    }
  }

  /**
   * 获取ctx上的全部参数
   * @param {ctx} ctx
   */
  _getAllParams(ctx) {
    return {
      query: ctx.request.query, // ?name=rex&age=23
      body: ctx.request.body, // json
      header: ctx.request.header,
      path: ctx.params // /user/:id
    };
  }

  /**
   * 获取所有需要校验的字段和自定义校验规则
   * @param {String | Function} key
   */
  _getAllRuleFields(key) {
    // 自定义规则的命名规范
    if (/validate([A-Z])\w+/g.test(key)) {
      return true;
    }
    // 规则必须是数组类型
    if (this[key] instanceof Rule) {
      return true;
    }
    if (this[key] instanceof Array) {
      this[key].forEach(rule => {
        const isRuleType = rule instanceof Rule;
        if (!isRuleType) {
          throw new Error("验证数组必须全部为Rule类型");
        }
      });
      return true;
    }
    // 其余返回 false
    // 如 RegisterValidator 的 constructor 和 Validator 的 实例方法(_getAllParams等方法)
    return false;
  }

  /**
   * Validator 实例方法，校验入口函数
   * @param {ctx} ctx
   */
  async validate(ctx, alias = {}) {
    let params = this._getAllParams(ctx);
    this.data = cloneDeep(params);
    this.parsed = cloneDeep(params);
    // 获取需要校验的全部字段 如 ['phone','username','password,'validatePassword']
    const checkFields = findFields(this, {
      // 这里要绑定 this 指向，不然会丢失
      filter: this._getAllRuleFields.bind(this)
    });
    // console.log("待检查字段：", checkFields);
    // 开始对所有待校验字段进行一一校验
    const errorMsgs = [];
    for (let key of checkFields) {
      const result = await this._check(key, alias);
      if (!result.success) {
        errorMsgs.push(result.msg);
      }
    }
    if (errorMsgs.length !== 0) {
      throw new global.errs.ParameterException(errorMsgs);
    }
    ctx.v = this;
    return this;
  }

  /**
   * 校验属性和校验自定义函数
   * @param {String} key 待校验的属性或方法
   * @param {Object} alias
   */
  async _check(key, alias) {
    const isCustomFun = typeof this[key] === "function" ? true : false;
    let result;
    // 自定义规则函数
    if (isCustomFun) {
      try {
        // 执行函数
        await this[key](this.data);
        result = new RuleResult(true); // 通过校验
      } catch (error) {
        result = new RuleResult(
          false,
          error.msg || error.message || "参数错误"
        );
      }
    } else {
      // 属性验证，每个属性的值都是一个数组,里面是一组 Rule（或者单一Rule）
      const rules = this[key];
      const ruleField = new RuleField(rules);
      // 别名替换
      key = alias[key] ? alias[key] : key;
      const param = this._findParam(key);
      result = ruleField.validate(param.value);
      if (result.pass) {
        // 校验通过分两种：1：正常校验通过、2：允许为空
        // 如果参数路径不存在，往往是因为用户传了空值，而又设置了默认值
        if (param.path.length === 0) {
          // 在 parsed 对象上添加一个 defalut 字段，值为 result.legalValue
          set(this.parsed, ["default", key], result.legalValue);
        } else {
          // 在 parsed 对象上的指定路径上，如this.parsed.body.password1，添加值为 result.legalValue
          set(this.parsed, param.path, result.legalValue);
        }
      }
    }
    if (!result.pass) {
      const msg = `${isCustomFun ? "" : key}${result.msg}`;
      return {
        msg,
        success: false
      };
    }
    return {
      msg: "ok",
      success: true
    };
  }

  /**
   * 根据key到this.data中获取前端传入的数据
   * @param {String} key
   */
  _findParam(key) {
    let value;
    // lodash库的get方法第二个参数可以是数组
    value = get(this.data, ["query", key]);
    if (value) {
      return {
        value,
        path: ["query", key]
      };
    }
    value = get(this.data, ["body", key]);
    if (value) {
      return {
        value,
        path: ["body", key]
      };
    }
    value = get(this.data, ["path", key]);
    if (value) {
      return {
        value,
        path: ["path", key]
      };
    }
    value = get(this.data, ["header", key]);
    if (value) {
      return {
        value,
        path: ["header", key]
      };
    }
    return {
      value: null,
      path: []
    };
  }
}

class RuleResult {
  // pass的含义：是否通过
  constructor(pass, msg = "") {
    Object.assign(this, {
      pass,
      msg
    });
  }
}

class RuleFieldResult extends RuleResult {
  constructor(pass, msg = "", legalValue = null) {
    super(pass, msg);
    this.legalValue = legalValue;
  }
}

class RuleField {
  constructor(rules) {
    // 对直接传入一个Rule类型的进行兼容
    this.rules = rules instanceof Array ? rules : [rules];
  }

  /**
   * 校验该字段
   * @param {String} field
   */
  validate(field) {
    if (field == null) {
      // 如果字段为空需要判断该参数是否是可选的！
      const allowEmpty = this._allowEmpty();
      const defaultValue = this._hasDefault();
      if (allowEmpty) {
        return new RuleFieldResult(true, "", defaultValue);
      } else {
        return new RuleFieldResult(false, "字段是必填参数");
      }
    }

    const fieldResult = new RuleFieldResult(false);
    for (let rule of this.rules) {
      // 调用Rule类的validate方法进行校验
      // Rule中会调用 validator.js 的对应方法进行校验
      let result = rule.validate(field);
      if (!result.pass) {
        fieldResult.msg = result.msg;
        fieldResult.legalValue = null;
        // 一旦一条校验规则不通过，则立即终止这个字段的验证
        return fieldResult;
      }
    }

    // 校验通过
    return new RuleFieldResult(true, "", this._convert(field));
  }

  /**
   * 对前端传进来的参数进行自动转换
   * @param {String} value
   */
  _convert(value) {
    for (let rule of this.rules) {
      if (rule.name === "isInt") {
        return parseInt(value);
      }
      if (rule.name == "isFloat") {
        return parseFloat(value);
      }
      if (rule.name == "isBoolean") {
        return value ? true : false;
      }
    }
    return value;
  }

  /**
   * 判断该字段的规则是否是可选的
   */
  _allowEmpty() {
    for (let rule of this.rules) {
      if (rule.name === "isOptional") {
        return true;
      }
    }
    return false;
  }

  /**
   * 判断该字段的规则中是否有传默认值
   */
  _hasDefault() {
    for (let rule of this.rules) {
      // new Rule(name, msg, ...params)
      // new Rule("isOptional", "", "123@qq.com"),
      const defaultValue = rule.params[0];
      if (rule.name === "isOptional") {
        return defaultValue;
      }
    }
  }
}

class Rule {
  constructor(name, msg, ...params) {
    this.name = name;
    this.msg = msg;
    this.params = params;
  }

  /**
   * 字段校验函数，调用 validator 库的方法
   * @param {String} field
   */
  validate(field) {
    if (this.name === "isOptional") return new RuleResult(true);
    // 调用 validator.js 的方法
    let result = validator[this.name](field + "", ...this.params);
    if (!result) {
      return new RuleResult(false, this.msg || "参数错误");
    }
    // 通过校验
    return new RuleResult(true, "");
  }
}

module.exports = {
  Validator,
  Rule
};
