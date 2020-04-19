/**
 * @description good Controller
 */

const {
  newGoodInfo,
  getAllGoods,
  getGoodInfoById,
  updateGoodInfo,
  getHotGoods,
  updateGoodStatus
} = require("@services/goods");

/**
 * 获取所有商品
 */
async function getAlls(id) {
  let result = await getAllGoods(id);
  result = handleData(result);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 获取在线动物
 * @param {int} id
 */
async function getOnlineAnimal(id) {
  let result = await getAllGoods(id, { status: 1 });
  result = handleData(result);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

// 处理数据
function handleData(data) {
  let goodInfo = [];
  data.forEach(data => {
    if (
      data &&
      data.dataValues &&
      data.dataValues.Supplier_Info &&
      data.dataValues.Supplier_Info.dataValues
    ) {
      // 将合并查找的 Supplier_Info 信息提取出来
      let supplierInfo = data.dataValues.Supplier_Info.dataValues;
      // 把商家的id名字更改为 supplierId，这样不会发生重叠
      supplierInfo = JSON.parse(
        JSON.stringify(supplierInfo).replace(/id/g, "supplierId")
      );
      // 把商家店铺的封面更改为 simgCover，这样不会发生重叠
      supplierInfo = JSON.parse(
        JSON.stringify(supplierInfo).replace(/imgCover/g, "simgCover")
      );
      Object.assign(data.dataValues, supplierInfo);
      delete data.dataValues.Supplier_Info;
      goodInfo.push(data.dataValues);
    }
  });
  return goodInfo;
}

/**
 * 获取热门商品
 */
async function getHotGood() {
  let result = await getHotGoods({
    status: 1
  });
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 根据商品id获取详情
 * @param {int} id
 */
async function getGoodDetail(id) {
  let result = await getGoodInfoById(id);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 新增商品
 * @param {string | int} param0 优惠卷信息
 */
async function newGood({
  goodName,
  price,
  descript,
  stock,
  imgCover,
  sales,
  expressCost,
  from,
  supplierId
}) {
  const goodInfo = await newGoodInfo({
    goodName,
    price,
    descript,
    stock,
    imgCover,
    sales,
    expressCost,
    from,
    supplierId
  });
  if (goodInfo) {
    return new global.succ.SuccessModel({ data: goodInfo });
  } else {
    return new global.errs.createInfoFail();
  }
}

/**
 * 更新商品信息
 * @param {int} goodId
 * @param {int} count
 */
async function updateInfo(goodInfo) {
  for (let i = 0; i < goodInfo.length; i++) {
    let result = await getGoodInfoById(goodInfo[i].goodId);
    let stock;
    let sales;
    if (result && result.dataValues) {
      stock = result.dataValues.stock - goodInfo[i].count;
      sales = result.dataValues.sales + goodInfo[i].count;
    }
    let res = await updateGoodInfo(goodInfo[i].goodId, stock, sales);
    if (!res) {
      return new global.errs.updateInfoFail();
    }
  }
  return new global.succ.SuccessModel({ msg: "更新成功" });
}

/**
 * 更新商品状态
 * @param {int} goodId
 */
async function updateStatus(goodId, status) {
  let result = await updateGoodStatus(goodId, status);
  if (result) {
    return new global.succ.SuccessModel({ msg: "更新成功" });
  } else {
    return new global.errs.updateInfoFail();
  }
}

module.exports = {
  getAlls,
  newGood,
  updateInfo,
  updateStatus,
  getGoodDetail,
  getHotGood,
  getOnlineAnimal
};
