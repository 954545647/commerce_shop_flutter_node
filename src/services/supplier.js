/**
 * @description 订单 services
 */

const { Supplier_Info, Animal_Info } = require("@db/model");
const { cutPath } = require("@utils/util");

/**
 * 获取所有商家信息
 */
async function getAllSuppliers() {
  const result = await Supplier_Info.findAll({});
  return result;
}

/**
 * 获取商家信息
 * @param {string} username
 */
async function getSupplierInfo(username) {
  const result = await Supplier_Info.findOne({
    attributes: ["id", "username", "phone", "imgCover"],
    where: {
      username
    }
  });
  return result;
}

/**
 * 通过商品id获取商家信息
 * @param {int} goodId
 */
async function getSupplierInfoByGoodId(id) {
  let result;
  // 根据商品id查询
  result = await Animal_Info.findOne({
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
  result = await Supplier_Info.findOne({
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
async function newSupplierInfo({
  username,
  password,
  phone,
  idNum,
  frontImg,
  backImg,
  imgCover
}) {
  frontImg = cutPath(frontImg);
  backImg = cutPath(backImg);
  imgCover = cutPath(imgCover);
  const result = await Supplier_Info.create({
    username,
    password,
    phone,
    idNum,
    frontImg,
    backImg,
    imgCover
  });
  return result;
}

module.exports = {
  getAllSuppliers,
  getSupplierInfo,
  newSupplierInfo,
  getSupplierInfoByGoodId,
  getSupplierInfoBySupplierId
};
