/**
 * @description coupon service
 */

const { Animal_Info, Supplier_Info } = require("@db/model");
const { cutPath } = require("@utils/util");

/**
 * 查找数据库中所有的商品信息(包括商家信息)
 */
async function getAllGoods(id, limit) {
  const whereOpt = {};
  if (id) {
    Object.assign(whereOpt, { supplierId: id });
  }
  if (limit) {
    Object.assign(whereOpt, { status: limit.status });
  }
  const result = await Animal_Info.findAll({
    where: whereOpt,
    include: [
      {
        model: Supplier_Info,
        attributes: ["id", "username", "phone", "imgCover"]
      }
    ]
  });
  return result;
}

/**
 * 获取上线动物
 */
async function getOnline() {
  const result = await getAllGoods(null, {
    status: 1
  });
  return result;
}

/**
 * 获取热门认养
 */
async function getHotGoods(limit) {
  let whereOpt = {};
  if (limit) {
    whereOpt = limit;
  }
  const result = await Animal_Info.findAll({
    where: whereOpt,
    include: [
      {
        model: Supplier_Info,
        attributes: ["id", "username", "phone", "imgCover"]
      }
    ],
    order: [["sales", "DESC"]],
    limit: 3
  });
  return result;
}

/**
 * 获取商品信息根据id
 * @param {int} goodId
 */
async function getGoodInfoById(goodId) {
  const result = await Animal_Info.findOne({
    where: {
      id: goodId
    },
    include: [
      {
        model: Supplier_Info,
        attributes: ["id", "username", "phone", "imgCover"]
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
  imgCover = cutPath(imgCover);
  const result = await Animal_Info.create({
    supplierId,
    goodName,
    price,
    descript,
    stock,
    imgCover,
    sales,
    expressCost,
    from
  });
  return result;
}

/**
 * 更新商品信息
 * @param {int} goodId
 * @param {int} count
 */
async function updateGoodInfo(goodId, stock, sales) {
  let result = await Animal_Info.update(
    {
      stock,
      sales
    },
    {
      where: {
        id: goodId
      }
    }
  );
  return result;
}

/**
 * 修改商品状态
 * @param {int} goodId
 */
async function updateGoodStatus(goodId, status) {
  const result = await Animal_Info.update(
    {
      status
    },
    {
      where: {
        id: goodId
      }
    }
  );
  return result;
}

module.exports = {
  newGoodInfo,
  getAllGoods,
  updateGoodInfo,
  getGoodInfoById,
  updateGoodStatus,
  getHotGoods,
  getOnline
};
