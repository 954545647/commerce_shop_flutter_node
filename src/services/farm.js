/**
 * @description farm service
 */

const {
  Crop_Info,
  Farm_Info,
  Farm_Crop,
  Good_Supplier,
  Farm_Order,
  Farm_Order_Detail
} = require("@db/model");

/**
 * 获取全部农场信息
 */
async function getAllFarmsInfo() {
  const farmInfo = await Farm_Info.findAll({
    include: {
      model: Good_Supplier
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
 * 获取单个农场信息
 * @param {int} id
 */
async function getFarmInfoById(id) {
  const farmInfo = await Farm_Info.findOne({
    where: {
      id: id
    },
    include: {
      model: Good_Supplier
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
async function getMyFarmsInfo(userId) {
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
  remainNum,
  preArea,
  imgCover,
  address,
  monitor
}) {
  const result = await Farm_Info.create({
    supplierId,
    farmName,
    descript,
    tags,
    totalNum,
    remainNum,
    preArea,
    imgCover,
    address,
    monitor
  });
  return result;
}

/**
 * 创建农作物
 * @param {int|string} param0
 */
async function createCropInfo({ cropName, price, descript, imgCover }) {
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
  payMoney,
  address
}) {
  const result = await Farm_Order.create({
    userId,
    couponId,
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

module.exports = {
  getAllFarmsInfo,
  getFarmInfoById,
  createFarmInfo,
  createCropInfo,
  createFarmCrop,
  getFarmCrops,
  createFarmOrder,
  createFarmOrderDetail,
  getMyFarmsInfo
};
