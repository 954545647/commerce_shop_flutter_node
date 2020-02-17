/**
 * @description coupon service
 */

const { Good_Info, Good_Comment, Good_Supplier } = require("@db/model");

/**
 * 查找数据库中所有的商品信息(包括商家信息)
 */
async function getAllGoods(id) {
  const whereOpt = {};
  if (id) {
    Object.assign(whereOpt, { supplierId: id });
  }
  const result = await Good_Info.findAll({
    where: whereOpt,
    include: [
      {
        model: Good_Supplier
      }
    ]
  });
  return result;
}

/**
 * 新增商品
 * @param {sting|int} param0 新增商品信息
 */
async function newGoodInfo({
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
  if (!imgCover)
    imgCover =
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1622486417,1321017286&fm=11&gp=0.jpg";
  const result = await Good_Info.create({
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
  return result;
}

/**
 * 新增供应商信息
 * @param {string | int} param0 供应商的信息
 */
async function newSupplierInfo({ name, phone, address }) {
  const result = await Good_Supplier.create({
    supplierName: name,
    phone,
    address
  });
  return result;
}

module.exports = {
  newGoodInfo,
  getAllGoods,
  newSupplierInfo
};
