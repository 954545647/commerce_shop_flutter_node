/**
 * @description 订单 controller
 */

const {
  createOrderInfo,
  createOrderDetail,
  getUserOrders,
  modifyOrderStatus
} = require("@services/order");

const { getUserCarts } = require("@services/cart");

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
      return new global.succ.SuccessModel({ data: orderInfo });
    } else {
      // 获取失败
      return new global.errs.createOrderFail();
    }
  }
}

/**
 * 获取用户全部订单
 * @param {int} userId
 */
async function getAllOrders(userId) {
  let orders = await getUserOrders(userId);
  if (orders) {
    return new global.succ.SuccessModel({ data: orders });
  } else {
    return new global.errs.searchInfoFail();
  }
}

/**
 * 修改用户订单状态
 * @param {int} userId
 * @param {int} orderId
 */
async function modifyStatus(orderId) {
  const result = await modifyOrderStatus(orderId, 2);
  if (result) {
    return new global.succ.SuccessModel({ msg: "修改成功" });
  } else {
    return new global.errs.updateInfoFail();
  }
}

module.exports = {
  newOrder,
  getAllOrders,
  modifyStatus
};
