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

const { getMessage, getHistory } = require("@services/socket");
const { getUserInfoByIds } = require("@services/user");

const { getSupplierFarms } = require("@services/farm");
const { getAllGoods } = require("@services/goods");
const generateToken = require("@utils/token");
const { REFRESH_TOKEN_EXPIRE } = require("@config/keys");

const {
  getSupplierGoodOrders,
  getGoodOrderDetail,
  getFarmOrderDetail,
  getSupplierFarmOrderDetails
} = require("@services/order");

const doCrypto = require("@utils/cryp.js");

/**
 * 获取全部商家信息
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
 * 通过商家id获取商家信息
 * @param {int} goodId
 * @param {int} supplierId
 */
async function getSupplierInfoById(supplierId) {
  let result = await getSupplierInfoBySupplierId(supplierId);
  if (result) {
    // 获取成功
    return new global.succ.SuccessModel({ msg: "获取成功", data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 通过商品id获取商家信息
 * @param {int} goodId
 * @param {int} supplierId
 */
async function getSupplierByGoodId(goodId) {
  let result = await getSupplierInfoByGoodId(goodId);
  if (result) {
    // 获取成功
    return new global.succ.SuccessModel({ msg: "获取成功", data: result });
  } else {
    return new global.errs.searchInfoFail();
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
  backImg,
  imgCover
}) {
  try {
    let supplierInfo = await newSupplierInfo({
      username,
      password: doCrypto(password),
      phone,
      idNum,
      frontImg,
      backImg,
      imgCover
    });
    return new global.succ.SuccessModel({ data: supplierInfo });
  } catch (error) {
    console.error(error);
    return new global.errs.registerFailInfo();
  }
}

/**
 * 查看商家是否存在
 * @param {string} username
 */
async function registerExit(username) {
  const supplierInfo = await getSupplierInfo(username);
  if (supplierInfo) {
    return new global.errs.registerUserExist();
  } else {
    return new global.succ.SuccessModel({ data: supplierInfo });
  }
}

/**
 * 商家登录
 * @param {string} username
 * @param {string} password
 */
async function registerLogin(username, password) {
  // 获取用户信息
  const supplierInfo = await getSupplierInfo(username);
  // 登录失败：用户不存在
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

  // 生成token
  let accessToken = generateToken(supplierInfo.dataValues);
  let refreshToken = generateToken(
    supplierInfo.dataValues,
    REFRESH_TOKEN_EXPIRE
  );
  Object.assign(supplierInfo.dataValues, { accessToken, refreshToken });
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
      let farmOrderDetailsTemp = [];
      if (
        farmOrderDetails &&
        farmOrderDetails[0] &&
        farmOrderDetails[0].dataValues
      ) {
        farmOrderDetailsTemp =
          farmOrderDetails[0].dataValues["Farm_Order_Details"];
        farmOrderDetails[0].dataValues[
          "Farm_Order_Details"
        ] = farmOrderDetailsTemp.filter(item => item["crop_count"] > 0);
      }
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

/**
 * 获取商家收到的消息
 * @param {int} id
 */
async function getSupplierMessage(id) {
  let result = {};
  let clientIds = new Set(); // 买家id集合
  let messageInfo = await getMessage(id);
  if (messageInfo) {
    for (let i = 0; i < messageInfo.length; i++) {
      let curItem = messageInfo[i].dataValues;
      // 记录消息的发送方
      result[curItem.fromId] = {};
      clientIds.add(curItem.fromId);
    }
  }
  // 根据发送方的id去获取发送方的信息
  let userInfo = await getUserInfoByIds([...clientIds]);
  if (userInfo) {
    for (let i = 0; i < userInfo.length; i++) {
      let curItem = userInfo[i].dataValues;
      // 根据发送方的id去获取聊天记录
      let historyInfo = await getHistory(curItem.id, id);
      result[curItem.id].userInfo = curItem;
      result[curItem.id].historyInfo = historyInfo;
    }
  }
  if (messageInfo && userInfo) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

module.exports = {
  getSuppliersInfo,
  newSupplier,
  getSupplierByGoodId,
  getSupplierInfoById,
  registerLogin,
  getSupplierFarm,
  getSupplierGood,
  getSupplierOrder,
  registerExit,
  getSupplierMessage
};
