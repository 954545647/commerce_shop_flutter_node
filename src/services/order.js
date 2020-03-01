/**
 * @description 订单 services
 */

const { Order_Detail, Order_Info } = require("@db/model");

/**
 * 创建订单主表
 * @param {int|string} param0
 */
async function createOrderInfo({
  userId,
  couponId,
  orderAmount,
  payMoney,
  address,
  status
}) {
  const result = await Order_Info.create({
    userId,
    couponId,
    order_amount: orderAmount,
    pay_money: payMoney,
    address,
    status
  });
  return result;
}

/**
 * 创建订单详情表
 * @param {array} valueArr
 */
async function createOrderDetail(valueArr) {
  let result = await Order_Detail.bulkCreate(valueArr);
  return result;
}

/**
 * 更新订单状态，变成失效
 * @param {int} orders
 */
async function modifyOrderStatus(orderId, status) {
  const result = await Order_Info.update(
    {
      status: status
    },
    {
      where: {
        id: orderId
      }
    }
  );
  return result;
}

/**
 * 定时器查询检查订单状态
 * @param {int} orderId
 */
async function checkOrderState(orderId) {
  let oldState;
  let result = await Order_Info.findOne({
    where: {
      id: orderId
    }
  });
  if (result && result.dataValues) {
    oldState = result.dataValues.status;
  }
  if (oldState == 1) {
    // 将订单状态修改为3，失效状态
    await modifyOrderStatus(orderId, 3);
  }
}

/**
 * 获取用户全部订单
 * @param {int} userId
 */
async function getUserOrders(userId) {
  let result = await Order_Info.findAll({
    where: {
      userId
    },
    order: [["status", "ASC"]],
    include: [
      {
        model: Order_Detail
      }
    ]
  });
  if (result) {
    result.forEach(data => {
      if (
        data &&
        data.dataValues &&
        data.dataValues.Order_Details &&
        data.dataValues.Order_Details.dataValues
      ) {
        let temp = data.dataValues.Order_Details;
        data.dataValues.details = temp;
        delete data.dataValues.Order_Details;
      }
    });
    return result;
  }
  return result;
}

module.exports = {
  checkOrderState,
  createOrderInfo,
  createOrderDetail,
  getUserOrders,
  modifyOrderStatus
};
