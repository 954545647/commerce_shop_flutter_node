/**
 * @description 商家 controller
 */

const {
  getAllSuppliers,
  newSupplierInfo,
  getSupplierInfoByGoodId,
  getSupplierInfoBySupplierId
} = require("@services/supplier");

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
async function newSupplier({ name, phone, address, cover }) {
  const supplierInfo = await newSupplierInfo({
    name,
    phone,
    address,
    cover
  });
  if (supplierInfo) {
    return new global.succ.SuccessModel({ data: supplierInfo });
  } else {
    return new global.errs.createInfoFail();
  }
}

module.exports = {
  getSuppliersInfo,
  newSupplier,
  getSupplierInfoById
};
