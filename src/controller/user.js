/**
 * @description user Controller
 */

const {
  createUser,
  modifyUser,
  getUserInfo,
  getUserAddress,
  getUserInfoById,
  getUserIntegral,
  newUserAddress,
  changeUserIntegral,
  newUserIntergral,
  getUserDefaultAddress,
  updateImgCover
} = require("@services/user");

const { getUserFarmsInfo } = require("@services/farm");

const doCrypto = require("@utils/cryp.js");

const generateToken = require("@utils/token");
const { REFRESH_TOKEN_EXPIRE } = require("@config/keys");
/**
 * 查看用户名是否存在
 * @param {string} username
 */
async function isExist(username) {
  const userInfo = await getUserInfo(username);
  if (userInfo) {
    // 如果存在
    return new global.errs.registerUserExist();
  } else {
    // 不存在
    return new global.succ.SuccessModel({ data: false });
  }
}

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} phone 手机号
 */
async function register({ username, password, phone }) {
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
  // 区分是用户不存在还是密码错误
  // 登录失败：用户不存在
  if (!userInfo) {
    return new global.errs.userNotExit();
  }
  // 登录失败：用户密码错误
  if (userInfo && userInfo.dataValues && userInfo.dataValues.password) {
    let pass = userInfo.dataValues.password;
    if (doCrypto(password) != pass) {
      return new global.errs.userPassError();
    }
  }
  // 生成token
  let accessToken = generateToken(userInfo.dataValues);
  let refreshToken = generateToken(userInfo.dataValues, REFRESH_TOKEN_EXPIRE);

  Object.assign(userInfo.dataValues, { accessToken, refreshToken });
  return new global.succ.SuccessModel({ data: userInfo.dataValues });
}

/**
 * 修改用户密码
 * @param {int} id 用户id
 * @param {string} password1
 * @param {string} password2
 */
async function changePass(id, oldPass, newPass) {
  const userInfo = await getUserInfoById(id);
  oldPass = doCrypto(oldPass);
  if (oldPass !== userInfo.dataValues.password) {
    // 原始密码错误
    return new global.errs.oldPassWrong();
  }
  const result = await modifyUser(id, doCrypto(newPass));
  if (!result[0]) {
    // 修改密码错误
    return new global.errs.changePassFail();
  }
  // 修改成功
  return new global.succ.SuccessModel({});
}

/**
 * 修改头像
 * @param {int} id
 * @param {sting} imgCover
 */
async function updateCover(id, imgCover) {
  let result = updateImgCover(id, imgCover);
  if (result) {
    // 修改成功
    return new global.succ.SuccessModel({});
  } else {
    // 修改头像错误
    return new global.errs.updateInfoFail();
  }
}

/**
 * 获取用户地址数据
 * @param {int} id
 */
async function getAddress(id) {
  const userAddress = await getUserAddress(id);
  if (userAddress) {
    return new global.succ.SuccessModel({ data: userAddress });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 获取用户默认地址数据
 * @param {int} id
 */
async function getDefaultAddress(id) {
  const userAddress = await getUserDefaultAddress(id);
  if (userAddress) {
    let defaultAddress = userAddress.dataValues;
    return new global.succ.SuccessModel({ data: defaultAddress });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 新增用户地址数据
 * @param {int} 用户id
 * @param {string} 地址参数
 */
async function newAddress({
  id,
  username,
  phone,
  province,
  city,
  area,
  address,
  isDefault
}) {
  const userAddress = await newUserAddress({
    id,
    username,
    phone,
    province,
    city,
    area,
    address,
    isDefault
  });
  if (userAddress) {
    return new global.succ.SuccessModel({});
  } else {
    return new global.errs.newAddressFail({});
  }
}

/**
 * 获取用户签到日期
 * @param {int} id 积分
 * @param {int} source 修改积分途径
 */
async function getUserSignDays(id) {
  const result = await getUserIntegral(id);
  if (result) {
    let signDays = [];
    result.forEach(data => {
      signDays.push(data.dataValues);
    });
    // 修改成功
    return new global.succ.SuccessModel({ data: signDays });
  } else {
    return new global.errs.searchSignInfoFail();
  }
}

/**
 * 修改积分
 * @param {int} id 积分
 * @param {int} source 修改积分途径
 */
async function changeIntegral(id, source) {
  // 先新增一条积分数据
  const res = await newUserIntergral(id, source);
  if (res) {
    // 更新用户的积分数据
    const result = await changeUserIntegral(id, source);
    if (result[0]) {
      // 修改成功
      return new global.succ.SuccessModel({});
    } else {
      return new global.errs.changeIntegralFail();
    }
  }
}

async function getUserTypeInfo(id, type) {
  let result;
  if (type == 1) {
    // 获取用户基本信息
    result = await getUserInfoById(id);
  } else if (type == 2) {
    // 获取用户地址信息
    result = await getUserAddress(id);
  } else if (type == 3) {
    // 获取用户积分信息
    result = await getUserIntegral(id);
  }
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 获取用户租地信息
 * @param {int} userId
 */
async function getMyFarm(userId) {
  const result = await getUserFarmsInfo(userId);
  if (result && result.length) {
    for (let i = 0; i < result.length; i++) {
      let cur = result[i].dataValues;
      let curFarmDetail = cur["Farm_Order_Details"];
      cur["Farm_Order_Details"] = curFarmDetail.filter(
        item => item["crop_count"] > 0
      );
    }
  }

  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 刷新token
 * @param {int} id 用户id
 */
async function refreshToken(id) {
  // 获取用户信息
  const userInfo = await getUserInfoById(id);
  if (userInfo && userInfo.dataValues) {
    // 生成token
    let accessToken = generateToken(userInfo.dataValues);
    let refreshToken = generateToken(userInfo.dataValues, REFRESH_TOKEN_EXPIRE);
    Object.assign(userInfo.dataValues, { accessToken, refreshToken });
  }
  return new global.succ.SuccessModel({ data: userInfo.dataValues });
}

module.exports = {
  isExist,
  register,
  login,
  changePass,
  getAddress,
  newAddress,
  changeIntegral,
  getUserSignDays,
  getUserTypeInfo,
  getDefaultAddress,
  getMyFarm,
  updateCover,
  refreshToken
};
