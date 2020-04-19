/**
 * @description rent Controller
 */

const {
  getFarmInfoById,
  getAllFarmsInfo,
  createFarmOrder,
  createFarmOrderDetail,
  createFarmInfo,
  createCropInfo,
  createFarmCrop,
  updateFarmState,
  updateFarmInfo,
  getHotFarms
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
  const result = await getAllFarmsInfo({
    status: 1
  });
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

// 获取热门农场信息
async function getHotFarm() {
  const result = await getHotFarms();
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
  farmCount,
  orderAmount,
  payMoney,
  address,
  cropsInfos,
  orderUsername,
  supplierId
}) {
  // 新增农场订单
  // 先创建主表
  const orderInfo = await createFarmOrder({
    userId,
    couponId,
    orderAmount,
    payMoney,
    farmCount,
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
        supplierId: supplierId,
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
 * 更新农场信息
 * @param {int} goodId
 * @param {int} count
 */
async function updateInfo(farmInfo) {
  let result = await getFarmInfoById(farmInfo.farmId);
  if (result && result.farmInfo) {
    totalNum = result.farmInfo.totalNum - farmInfo.areaNum;
    sailNum = result.farmInfo.sailNum + farmInfo.areaNum;
  }
  let res = await updateFarmInfo(farmInfo.farmId, totalNum, sailNum);
  if (!res) {
    return new global.errs.updateInfoFail();
  }
  return new global.succ.SuccessModel({ msg: "更新成功" });
}

/**
 * 新增农场
 * @param {int|string} param0
 */
async function newFarm({
  supplierId,
  farmName,
  descript,
  tags,
  totalNum,
  sailNum,
  preArea,
  preMoney,
  imgCover,
  address,
  monitor
}) {
  const farmInfo = await createFarmInfo({
    supplierId,
    farmName,
    descript,
    tags,
    totalNum,
    sailNum,
    preArea,
    preMoney,
    imgCover,
    address,
    monitor
  });
  if (farmInfo) {
    return new global.succ.SuccessModel({ data: farmInfo });
  } else {
    return new global.errs.createInfoFail();
  }
}

/**
 * 新增农作物
 * @param {int|string} param0
 */
async function newCrop({ cropName, descript, price, imgCover, farmId }) {
  const cropInfo = await createCropInfo({
    cropName,
    descript,
    price,
    imgCover
  });
  if (cropInfo) {
    // 创建农场和作物关系
    await createFarmCrop(farmId, cropInfo.dataValues.id);
    // 修改农场状态
    await updateFarmState(farmId);
    return new global.succ.SuccessModel({ data: cropInfo });
  } else {
    return new global.errs.createInfoFail();
  }
}

module.exports = {
  getFarmInfo,
  getAllFarms,
  newFarmOrder,
  newFarm,
  newCrop,
  getHotFarm,
  updateInfo
};
