/**
 * @description coupon service
 */

const { Good_Info, Good_Supplier } = require("@db/model");

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

module.exports = {
  newGoodInfo,
  getAllGoods
};
