/**
 * @description rent Controller
 */

const {
  getFarmInfoById,
  getAllFarmsInfo,
  createFarmOrder,
  createFarmOrderDetail,
  getMyFarmsInfo
} = require("@services/farm");

/**
 * 获取单个农场信息
 * @param {int} id
 */
async function getFarmInfo(id) {
  const result = await getFarmInfoById(id);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

// 获取全部农场信息
async function getAllFarms() {
  const result = await getAllFarmsInfo();
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 创建农场订单
 * @param {int|string|array} param0
 */
async function newFarmOrder({
  userId,
  couponId,
  farmId,
  orderAmount,
  payMoney,
  address,
  cropsInfos,
  orderUsername
}) {
  // 新增农场订单
  // 先创建主表
  const orderInfo = await createFarmOrder({
    userId,
    couponId,
    orderAmount,
    payMoney,
    address
  });
  if (orderInfo && orderInfo.dataValues) {
    // 创建副表
    let orderId = orderInfo.dataValues.id;
    let valueArr = [];
    for (let i = 0; i < cropsInfos.length; i++) {
      let crop = cropsInfos[i];
      let val = {
        orderId,
        cropId: crop.id,
        farmId: farmId,
        order_username: orderUsername,
        crop_cover: crop.imgCover,
        crop_name: crop.goodName,
        crop_count: crop.count,
        crop_price: crop.price
      };
      valueArr.push(val);
    }
    const orderDetail = await createFarmOrderDetail(valueArr);
    if (orderDetail) {
      return new global.succ.SuccessModel({ data: orderInfo });
    } else {
      // 获取失败
      return new global.errs.createOrderFail();
    }
  }
}

/**
 * 获取用户租地信息
 * @param {int} userId
 */
async function getMyFarm(userId) {
  const result = await getMyFarmsInfo(userId);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

module.exports = {
  getFarmInfo,
  getAllFarms,
  newFarmOrder,
  getMyFarm
};
