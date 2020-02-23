/**
 * @description 订单 controller
 */

const {
  getUserCarts,
  hanldeUserCarts,
  updateUserCarts,
  getAllSuppliers,
  createOrderInfo,
  createOrderDetail,
  deleteUserCarts
} = require("@services/order");

/**
 * 新增订单数据
 * @param {int|array|string} param0
 */
async function newOrder({
  userId,
  couponId,
  orderAmount,
  payMoney,
  address,
  status,
  goodsId,
  orderUsername
}) {
  // 新增订单
  // 无论是支付还是取消支付都创建订单数据
  // 首先对数据进行处理，生成一张主表和多张副表
  const orderInfo = await createOrderInfo({
    userId,
    couponId,
    orderAmount,
    payMoney,
    address,
    status
  });
  if (orderInfo && orderInfo.dataValues) {
    // 创建副表
    let orderId = orderInfo.dataValues.id;
    let valueArr = [];
    for (let i = 0; i < goodsId.length; i++) {
      // 根据每件商品的id去发请求，从购物车拿对应数据生成详情表
      // 这里可以在生成购物车之后保存到redis（待优化）
      let curGood = await getUserCarts(userId, goodsId[i]);
      let val = {
        orderId,
        goodId: goodsId[i],
        supplierId: curGood.supplierId,
        order_username: orderUsername,
        good_cover: curGood.imgCover,
        good_name: curGood.goodName,
        good_count: curGood.count,
        good_price: curGood.price
      };
      valueArr.push(val);
    }
    const orderDetail = await createOrderDetail(valueArr);
    if (orderDetail) {
      return new global.succ.SuccessModel({ data: orderDetail });
    } else {
      // 获取失败
      return new global.errs.createOrderFail();
    }
  }
}

/**
 * 获取用户的购物车
 * @param {int} userId 用户id
 * @param {int} goodId 商品id
 */
async function getCarts(userId, goodId = null) {
  let result = await getUserCarts(userId, goodId);
  if (result) {
    return new global.succ.SuccessModel({ data: result });
  } else {
    // 查找失败
    return new global.errs.searchInfoFail();
  }
}

/**
 * 操作购物车（新增商品，删除商品）
 * @param {string | int} param0 购物车数据
 */
async function handleCarts({
  userId,
  goodId,
  goodName,
  price,
  count,
  expressCost
}) {
  // 是新增购物车
  if (goodName) {
    // 先查看当前数据库中是否已经有该条数据了，如果有就单纯增加数量count
    const result = await getUserCarts(userId, goodId);
    if (result) {
      // 更新购物车
      let num = result.count; // 购物车原本数据
      const update = await updateUserCarts(userId, goodId, num + count);
      if (update && update[0] != 0) {
        return new global.succ.SuccessModel({ data: "更新成功" });
      } else {
        // 更新失败
        return new global.errs.updateInfoFail();
      }
    } else {
      // 新增购物车
      const cartInfo = await hanldeUserCarts({
        userId,
        goodId,
        goodName,
        price,
        count,
        expressCost
      });
      if (cartInfo) {
        // 新增成功
        return new global.succ.SuccessModel({ data: cartInfo });
      } else {
        // 新增失败
        return new global.errs.createInfoFail();
      }
    }
  } else {
    // 是删除购物车
    const cartInfo = await hanldeUserCarts({ userId, goodId });
    if (cartInfo) {
      // 删除成功
      return new global.succ.SuccessModel({ data: "删除成功" });
    } else {
      // 删除失败
      return new global.errs.deleteInfoFail();
    }
  }
}

/**
 * 删除购物车
 * @param {int|array} cartIds
 */
async function deleteCarts(cartIds) {
  const result = await deleteUserCarts(cartIds);
  if (result) {
    // 获取成功
    return new global.succ.SuccessModel({ msg: "删除成功" });
  } else {
    return new global.errs.deleteInfoFail();
  }
}

/**
 * 更新购物车
 * @param {int} userId
 * @param {int} goodId
 * @param {int} count
 */
async function updateCarts(userId, goodId, count) {
  const result = await updateUserCarts(userId, goodId, count);
  if (result) {
    // 获取成功
    return new global.succ.SuccessModel({ msg: "更新成功" });
  } else {
    return new global.errs.updateInfoFail();
  }
}

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

module.exports = {
  handleCarts,
  updateCarts,
  getCarts,
  getSuppliersInfo,
  newOrder,
  deleteCarts
};
