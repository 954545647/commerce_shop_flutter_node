/**
 * @description 商家 controller
 */

const {
  getAllSuppliers,
  newSupplierInfo,
  getSupplierInfo,
  getSupplierInfoByGoodId,
  getSupplierInfoBySupplierId
} = require("@services/supplier");

const doCrypto = require("@utils/cryp.js");

/**
 * 获取商家信息
 */
async function getSuppliersInfo() {
  const result = await getAllSuppliers();
  if (result) {
    // 获取成功
    return new global.succ.SuccessModel({ msg: "获取成功", data: result });
  } else {
    return new global.errs.updateInfoFail();
  }
}

/**
 * 通过商品id或者商家id获取商家信息
 * @param {int} goodId
 * @param {int} supplierId
 */
async function getSupplierInfoById(goodId, supplierId) {
  let result;
  if (goodId) {
    result = await getSupplierInfoByGoodId(goodId);
  } else if (supplierId) {
    result = await getSupplierInfoBySupplierId(supplierId);
  }
  if (result) {
    // 获取成功
    return new global.succ.SuccessModel({ msg: "获取成功", data: result });
  } else {
    return new global.errs.updateInfoFail();
  }
}

/**
 * 新增供应商
 * @param {string | int} param0 供应商信息
 */
async function newSupplier({
  username,
  password,
  phone,
  idNum,
  frontImg,
  backImg
}) {
  const supplierInfo = await getSupplierInfo(username);
  if (supplierInfo) {
    // 用户名已存在
    return new global.errs.registerUserExist();
  }
  try {
    let supplierInfo = await newSupplierInfo({
      username,
      password: doCrypto(password),
      phone,
      idNum,
      frontImg,
      backImg
    });
    return new global.succ.SuccessModel({ data: supplierInfo });
  } catch (error) {
    console.error(error);
    return new global.errs.registerFailInfo();
  }
}

/**
 * 商家注册
 * @param {string} username
 * @param {string} password
 */
async function registerLogin(username, password) {
  // 获取用户信息
  const supplierInfo = await getSupplierInfo(username);
  if (!supplierInfo) {
    return new global.errs.userNotExit();
  }
  // 登录失败：用户密码不存在
  if (
    supplierInfo &&
    supplierInfo.dataValues &&
    supplierInfo.dataValues.password
  ) {
    let pass = supplierInfo.dataValues.password;
    if (doCrypto(password) != pass) {
      return new global.errs.userPassError();
    }
  }
  return new global.succ.SuccessModel({ data: supplierInfo.dataValues });
}

module.exports = {
  getSuppliersInfo,
  newSupplier,
  getSupplierInfoById,
  registerLogin
};
