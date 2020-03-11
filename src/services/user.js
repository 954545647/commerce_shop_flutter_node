/**
 * @description user service
 */

const { User_Info, User_Address, User_Integral } = require("@db/model");
const { changeIntegral } = require("@utils/util");
const { cutPath } = require("@utils/util");
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
    attributes: ["id", "username", "phone", "imgCover", "point"],
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
    attributes: ["id", "username", "phone", "point", "createdAt"],
    where: {
      id
    }
  });
  return result;
}

/**
 * 根据id查找用户地址
 * @param {int} id
 */
async function getUserAddress(id) {
  // 查询所有
  const result = await User_Address.findAll({
    where: {
      userId: id
    }
  });
  // 返回的是一个数组
  return result;
}

// 获取用户默认地址
async function getUserDefaultAddress(id) {
  // 查询所有
  const result = await User_Address.findOne({
    where: {
      userId: id,
      isDefault: true
    }
  });
  // 返回的是一个数组
  return result;
}

/**
 * 根据id查找用户积分信息
 * @param {int} id
 */
async function getUserIntegral(id) {
  // 查询所有
  const result = await User_Integral.findAll({
    where: {
      userId: id
    }
  });
  // 返回的是一个数组
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

/**
 * 修改头像
 * @param {int} id
 * @param {sting} imgCover
 */
async function updateImgCover(id, imgCover) {
  imgCover = cutPath(imgCover);
  const res = await User_Info.update(
    {
      imgCover: imgCover
    },
    {
      where: {
        id
      }
    }
  );
  return res;
}

/**
 * 新增用户地址
 * @param {string} param0 地址参数
 */
async function newUserAddress({
  id,
  username,
  phone,
  province,
  city,
  area,
  address,
  isDefault
}) {
  // 新增地址数据
  const res = await User_Address.create({
    userId: id,
    username,
    phone,
    province,
    city,
    area,
    address,
    isDefault
  });
  return res.dataValues;
}

/**
 * 新增积分数据
 * @param {int} id  id
 * @param {int} source 来源
 */
async function newUserIntergral(id, source) {
  const res = await User_Integral.create({
    userId: id,
    source
  });
  return res;
}

/**
 * 修改用户积分
 * @param {int} id 用户id
 * @param {int} source 积分修改来源
 */
async function changeUserIntegral(id, source) {
  const userIntegral = await getUserInfoById(id);
  if (userIntegral.dataValues) {
    const res = await User_Info.update(
      {
        point: changeIntegral(userIntegral.dataValues.point, source)
      },
      {
        where: {
          id
        }
      }
    );
    return res;
  } else {
    return null;
  }
}

module.exports = {
  createUser,
  getUserInfo,
  getUserInfoById,
  modifyUser,
  getUserAddress,
  newUserAddress,
  changeUserIntegral,
  getUserIntegral,
  newUserIntergral,
  getUserDefaultAddress,
  updateImgCover
};
