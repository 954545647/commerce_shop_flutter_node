/**
 * @description user service
 */

const { User_Info } = require("@db/model");

/**
 * 查询数据中用户信息
 * @param {string} username
 * @param {string} password
 */
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
 * 根据id查找用户数据
 * @param {int} id
 */
async function getUserInfoById(id) {
  const result = await User_Info.findOne({
    attributes: ["id", "username", "password", "phone"],
    where: {
      id
    }
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

/**
 * 修改用户密码
 * @param {int} id
 * @param {string} password
 */
async function modifyUser(id, password) {
  const res = await User_Info.update(
    {
      password: password
    },
    {
      where: {
        id
      }
    }
  );
  return res;
}

module.exports = {
  createUser,
  getUserInfo,
  getUserInfoById,
  modifyUser
};
