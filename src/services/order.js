/**
 * @description 订单 services
 */

const { Order_Cart, Order_Detail, Order_Info } = require("@db/model");

/**
 * 获取用户的购物车
 * @param {int} userId 用户id
 * @param {int} goodId 商品id
 */
async function getUserCarts(userId, goodId) {
  let result;
  const whereOpt = {
    userId: userId
  };
  // 查找用户购物车单条数据
  if (goodId) {
    Object.assign(whereOpt, { goodId });
    result = await Order_Cart.findOne({
      where: whereOpt
    });
  } else {
    // 查找用户全部购物车数据
    result = await Order_Cart.findAll({
      where: whereOpt
    });
  }
  return result;
}

/**
 * 更新购物车数据
 * @param {int} userId 用户id
 * @param {int} goodId 商品id
 * @param {int} count 购物车数量
 */
async function updateUserCarts(userId, goodId, count) {
  console.log(count);
  const result = await Order_Cart.update(
    {
      count
    },
    {
      where: {
        userId,
        goodId
      }
    }
  );
  return result;
}

/**
 * 操作购物车（新增商品，删除商品）
 * @param {string | int} param0 购物车数据
 */
async function hanldeUserCarts({
  userId,
  goodId,
  goodName,
  price,
  count,
  expressCount
}) {
  let cartInfo;
  if (goodName) {
    // 是新增购物车
    cartInfo = await Order_Cart.create({
      userId,
      goodId,
      goodName,
      count,
      price,
      expressCount
    });
  } else {
    // 是删除购物车
    cartInfo = await Order_Cart.destroy({
      where: {
        userId,
        goodId
      }
    });
  }
  return cartInfo;
}

module.exports = {
  getUserCarts,
  hanldeUserCarts,
  updateUserCarts
};
