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

const { getSupplierFarms } = require("@services/farm");
const { getAllGoods } = require("@services/goods");
const {
  getSupplierGoodOrders,
  getGoodOrderDetail,
  getFarmOrderDetail,
  getSupplierFarmOrderDetails
} = require("@services/order");

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

/**
 * 获取商家的农场
 * @param {int} id
 */
async function getSupplierFarm(id) {
  const farmInfo = await getSupplierFarms(id);
  if (farmInfo) {
    return new global.succ.SuccessModel({ data: farmInfo });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 获取商家的商品
 * @param {int} id
 */
async function getSupplierGood(id) {
  const goodInfo = await getAllGoods(id);
  if (goodInfo) {
    return new global.succ.SuccessModel({ data: goodInfo });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 获取商家的订单
 * @param {int} id
 */
async function getSupplierOrder(id) {
  // 商家订单信息
  let supplierOrders = {
    goodOrderList: [], // 认养订单
    farmOrderList: [] // 租地订单
  };
  // 获取商家认养订单
  const goodOrders = await getSupplierGoodOrders(id);
  // 根据orderId去获取order详情信息
  let goodOrderIds = [];
  if (goodOrders) {
    for (let i = 0; i < goodOrders.length; i++) {
      let cur = goodOrders[i];
      if (goodOrderIds.includes(cur.orderId)) {
        continue;
      }
      // 根据商品详情表（副表）中的id去获取商品主表的信息
      let goodOrderDetails = await getGoodOrderDetail(cur.orderId);
      supplierOrders.goodOrderList.push(...goodOrderDetails);
      goodOrderIds.push(cur.orderId);
    }
  }
  // 获取商家租地订单
  const farmOrders = await getSupplierFarmOrderDetails(id);
  let farmOrderIds = [];
  if (farmOrders) {
    for (let i = 0; i < farmOrders.length; i++) {
      let cur = farmOrders[i];
      if (farmOrderIds.includes(cur.orderId)) {
        continue;
      }
      // 根据租地订单详情表（副表）中的id去获取租地主表的信息
      let farmOrderDetails = await getFarmOrderDetail(cur.orderId);
      supplierOrders.farmOrderList.push(...farmOrderDetails);
      farmOrderIds.push(cur.orderId);
    }
  }
  if (supplierOrders) {
    return new global.succ.SuccessModel({ data: supplierOrders });
  } else {
    return new global.errs.searchInfoFail();
  }
}

module.exports = {
  getSuppliersInfo,
  newSupplier,
  getSupplierInfoById,
  registerLogin,
  getSupplierFarm,
  getSupplierGood,
  getSupplierOrder
};
