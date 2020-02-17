/**
 * @description good Controller
 */

const {
  newGoodInfo,
  getAllGoods,
  newSupplierInfo
} = require("@services/goods");

/**
 * 获取所有商品
 */
async function getAlls(id) {
  console.log(id);
  const result = await getAllGoods(id);
  if (result) {
    let goodInfo = [];
    result.forEach(data => {
      if (
        data &&
        data.dataValues &&
        data.dataValues.Good_Supplier &&
        data.dataValues.Good_Supplier.dataValues
      ) {
        // 将合并查找的 Good_Supplier 信息提取出来
        let supplierInfo = data.dataValues.Good_Supplier.dataValues;
        Object.assign(data.dataValues, supplierInfo);
        delete data.dataValues.Good_Supplier;
        goodInfo.push(data.dataValues);
      }
    });
    return new global.succ.SuccessModel({ data: goodInfo });
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
    return new global.errs.newCouponFail();
  }
}

/**
 * 新增供应商
 * @param {string | int} param0 供应商信息
 */
async function newSupplier({ name, phone, address }) {
  const supplierInfo = await newSupplierInfo({
    name,
    phone,
    address
  });
  if (supplierInfo) {
    return new global.succ.SuccessModel({ data: supplierInfo });
  } else {
    return new global.errs.createInfoFail();
  }
}

module.exports = {
  getAlls,
  newGood,
  newSupplier
};
