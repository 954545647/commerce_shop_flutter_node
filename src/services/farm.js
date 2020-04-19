/**
 * @description farm service
 */

const {
  Crop_Info,
  Farm_Info,
  Farm_Crop,
  Supplier_Info,
  Farm_Order,
  Farm_Order_Detail
} = require("@db/model");
const { cutPath } = require("@utils/util");

/**
 * 获取全部农场信息
 */
async function getAllFarmsInfo(limit) {
  let whereOpt = {};
  if (limit) {
    whereOpt = limit;
  }
  const farmInfo = await Farm_Info.findAll({
    where: whereOpt,
    include: {
      model: Supplier_Info,
      attributes: ["id", "username", "phone", "imgCover"]
    }
  });
  let result = [];
  if (farmInfo) {
    for (let i = 0; i < farmInfo.length; i++) {
      let cropInfo = [];
      let curId = farmInfo[i].dataValues.id;
      let cropRes = await getFarmCrops(curId);
      cropRes.forEach(data => {
        if (data && data.dataValues) {
          cropInfo.push(data.dataValues);
        }
      });
      let curInfo = {};
      curInfo.farmInfo = farmInfo[i].dataValues;
      curInfo.farmInfo.cropInfo = cropInfo;
      result.push(curInfo);
    }
  }
  return result;
}

/**
 * 获取上线农场
 */
async function getOnlineFarm() {
  const result = await getAllFarmsInfo({
    status: 1
  });
  return result;
}

/**
 * 获取热门租地
 */
async function getHotFarms() {
  const farmInfo = await getAllFarmsInfo({
    status: 1
  });
  if (farmInfo) {
    farmInfo.sort((a, b) => a.sailNum - b.sailNum);
    if (farmInfo.length > 3) {
      farmInfo.slice(0, 3);
    }
  }
  return farmInfo;
}

/**
 * 获取单个农场信息
 * @param {int} id
 */
async function getFarmInfoById(id) {
  const farmInfo = await Farm_Info.findOne({
    where: {
      id: id
    },
    include: {
      model: Supplier_Info
    }
  });
  let cropRes = await getFarmCrops(id);
  let cropInfo = [];
  cropRes.forEach(data => {
    if (data && data.dataValues) {
      cropInfo.push(data.dataValues);
    }
  });
  let result = {};
  result.farmInfo = farmInfo.dataValues;
  result.farmInfo.cropInfo = cropInfo;
  return result;
}

/**
 * 获取用户租地信息
 * @param {int} userId
 */
async function getUserFarmsInfo(userId) {
  const result = await Farm_Order.findAll({
    where: {
      userId
    },
    include: {
      model: Farm_Order_Detail
    }
  });
  return result;
}

/**
 * 获取商家的农场信息
 * @param {int} id
 */
async function getSupplierFarms(id) {
  const result = await Farm_Info.findAll({
    where: {
      supplierId: id
    }
  });
  return result;
}

/**
 * 获取农场的农作物
 * @param {int} id
 */
async function getFarmCrops(id) {
  const cropIds = await Farm_Crop.findAll({
    where: {
      farmId: id
    }
  });
  let res = [];
  cropIds.forEach(data => {
    if (data && data.dataValues) {
      res.push(data.dataValues.cropId);
    }
  });
  let cropRes = await Crop_Info.findAll({
    where: {
      id: res
    }
  });
  return cropRes;
}

/**
 * 创建农场
 * @param {int|string} param0
 */
async function createFarmInfo({
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
  imgCover = cutPath(imgCover);
  const result = await Farm_Info.create({
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
  return result;
}

/**
 * 修改农场状态
 * @param {int} farmId
 */
async function updateFarmState(farmId) {
  const result = await Farm_Info.update(
    {
      status: 1
    },
    {
      where: {
        id: farmId
      }
    }
  );
  return result;
}

/**
 * 创建农作物
 * @param {int|string} param0
 */
async function createCropInfo({ cropName, price, descript, imgCover }) {
  imgCover = cutPath(imgCover);
  const result = await Crop_Info.create({
    cropName,
    price,
    descript,
    imgCover
  });
  return result;
}

/**
 * 创建农场作物关系
 * @param {int} param0
 */
async function createFarmCrop(farmId, cropId) {
  const result = await Farm_Crop.create({
    farmId,
    cropId
  });
  return result;
}

/**
 * 创建农场订单主表
 * @param {int|string} param0
 */
async function createFarmOrder({
  userId,
  couponId,
  orderAmount,
  farmCount,
  payMoney,
  address
}) {
  const result = await Farm_Order.create({
    userId,
    couponId,
    farmCount,
    order_amount: orderAmount,
    pay_money: payMoney,
    address
  });
  return result;
}

/**
 * 创建农场订单详情表
 * @param {array} valueArr
 */
async function createFarmOrderDetail(valueArr) {
  const result = await Farm_Order_Detail.bulkCreate(valueArr);
  return result;
}

/**
 * 更新农场信息
 * @param {int} farmId
 * @param {int} count
 */
async function updateFarmInfo(farmId, totalNum, sailNum) {
  let result = await Farm_Info.update(
    {
      totalNum,
      sailNum
    },
    {
      where: {
        id: farmId
      }
    }
  );
  return result;
}

module.exports = {
  getAllFarmsInfo,
  getFarmInfoById,
  createFarmInfo,
  createCropInfo,
  createFarmCrop,
  getFarmCrops,
  createFarmOrder,
  createFarmOrderDetail,
  getUserFarmsInfo,
  getSupplierFarms,
  updateFarmState,
  updateFarmInfo,
  getHotFarms,
  getOnlineFarm
};
