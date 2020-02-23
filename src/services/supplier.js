/**
 * @description 订单 services
 */

const { Good_Supplier, Good_Info } = require("@db/model");

/**
 * 获取所有商家信息
 */
async function getAllSuppliers() {
  const result = await Good_Supplier.findAll({});
  return result;
}

/**
 * 通过商品id获取商家信息
 * @param {int} goodId
 */
async function getSupplierInfoByGoodId(id) {
  let result;
  // 根据商品id查询
  result = await Good_Info.findOne({
    where: {
      id
    }
  });
  if (result && result.dataValues) {
    result = await getSupplierInfoBySupplierId(result.dataValues.supplierId);
  }
  if (result && result.dataValues) {
    return result.dataValues.id;
  } else {
    return null;
  }
}

/**
 * 通过商家id获取商家信息
 * @param {int} supplierId
 */
async function getSupplierInfoBySupplierId(id) {
  let result;
  // 根据商家id查询
  result = await Good_Supplier.findOne({
    where: {
      id: id
    }
  });
  return result;
}

/**
 * 新增供应商信息
 * @param {string | int} param0 供应商的信息
 */
async function newSupplierInfo({ name, phone, address, cover }) {
  const result = await Good_Supplier.create({
    supplierName: name,
    phone,
    address,
    cover
  });
  return result;
}

module.exports = {
  getAllSuppliers,
  newSupplierInfo,
  getSupplierInfoByGoodId,
  getSupplierInfoBySupplierId
};
