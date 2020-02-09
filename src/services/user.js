/**
 * @description user service
 */

const { User_Info } = require("@db/model");

async function getUserInfo(username, password) {
  // 查询条件
  const whereOpt = {
    username
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }
  // 查询
  const result = await User_Info.findOne({
    attributes: ["id", "username", "phone"],
    where: whereOpt
  });
  return result;
}

/**
 * 创建用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} phone 手机号
 */
async function createUser({ username, password, phone }) {
  const result = await User_Info.create({
    username,
    password,
    phone
  });
  const data = result.dataValues;
  return data;
}

module.exports = {
  createUser,
  getUserInfo
};
