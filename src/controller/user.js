/**
 * @description user Controller
 */

const { createUser, getUserInfo } = require("@services/user");
const doCrypto = require("@utils/cryp.js");
/**
 * 查看用户名是否存在
 * @param {string} username
 */
async function isExist(username) {
  const userInfo = await getUserInfo(username);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new global.erros.registerUserExist();
  }
}

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} phone 手机号
 */
async function register({ username, password, phone }) {
  const userInfo = await getUserInfo(username);
  if (userInfo) {
    // 用户名已存在
    return new global.errs.registerUserExist();
  }

  try {
    await createUser({ username, password: doCrypto(password), phone });
    return new global.succ.SuccessModel({});
  } catch (error) {
    console.error(error);
    return new global.errs.registerFailInfo();
  }
}

/**
 * 登录
 * @param {string} username
 * @param {string} password
 */
async function login(username, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(username, doCrypto(password));
  if (!userInfo) {
    // 登录失败
    return new global.errs.loginFailInfo();
  }
  return new global.succ.SuccessModel({ data: userInfo.dataValues });
}

module.exports = {
  isExist,
  register,
  login
};
