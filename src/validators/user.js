/**
 * @description 用户参数校验模型
 */
const { Validator, Rule } = require("@core/validator");

// 注册参数校验
class RegisterValidator extends Validator {
  constructor() {
    super();
    this.username = [
      new Rule("isLength", "昵称长度必须在3-20之间", {
        min: 3,
        max: 20
      })
    ];
    this.password = [
      new Rule("isLength", "密码至少3个字符,最多20个字符", {
        min: 3,
        max: 20
      })
      // new Rule(
      //   "matches",
      //   "密码长度必须在6~22位之间，包含字符、数字和 _ ",
      //   "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
      // )
    ];
    this.phone = [new Rule("matches", "手机格式不正确", /^1[3456789]\d{9}$/)];
  }

  // validatePassword(vals) {
  //   const psw1 = vals.body.password1;
  //   const psw2 = vals.body.password2;
  //   if (psw1 !== psw2) {
  //     throw new Error("两次输入的密码不一致，请重新输入");
  //   }
  // }
}

// 登录参数校验
class LoginValidator extends Validator {
  constructor() {
    super();
    this.username = [
      new Rule("isLength", "昵称长度必须在3-20之间", {
        min: 3,
        max: 20
      })
    ];
    this.password = [
      new Rule("isLength", "密码至少3个字符,最多20个字符", {
        min: 3,
        max: 20
      })
    ];
  }
}

// 修改密码参数校验
class ChangePasswordValidator extends Validator {
  constructor() {
    super();
    this.oldPass = [
      new Rule("isLength", "密码至少3个字符,最多20个字符", {
        min: 3,
        max: 20
      })
    ];
    this.newPass = this.oldPass;
  }
  // validatePassword(vals) {
  //   const psw1 = vals.body.password1;
  //   const psw2 = vals.body.password2;
  //   if (psw1 !== psw2) {
  //     throw new Error("两次输入的密码不一致，请重新输入");
  //   }
  // }
}

// 新增地址参数校验
class AddNewAddressValidator extends Validator {
  constructor() {
    super();
    this.area = this.city;
    this.username = [
      new Rule("isLength", "昵称长度必须在3-20之间", {
        min: 3,
        max: 20
      })
    ];
    this.address = [
      new Rule("isLength", "详细地址长度必须在1到100之间", {
        min: 1,
        max: 100
      })
    ];
    this.phone = [new Rule("matches", "手机格式不正确", /^1[3456789]\d{9}$/)];
    this.province = this.username;
    this.city = [
      new Rule("isLength", "城市长度必须在1到10之间", {
        min: 1,
        max: 10
      })
    ];
  }
}

// 修改积分参数校验
class ChangeIntegralValidator extends Validator {
  constructor() {
    super();
    this.source = [
      new Rule("isInt", "积分来源范围为[1-1000]", {
        gt: -1001,
        lt: 1001
      })
    ];
  }
}

module.exports = {
  LoginValidator,
  RegisterValidator,
  ChangePasswordValidator,
  AddNewAddressValidator,
  ChangeIntegralValidator
};
