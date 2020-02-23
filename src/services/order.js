/**
 * @description 订单 services
 */

const {
  Order_Cart,
  Order_Detail,
  Order_Info,
  Good_Info
} = require("@db/model");

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
 * @param {int|string|array} param0
 */
async function createOrderDetail(valueArr) {
  let result = await Order_Detail.bulkCreate(valueArr);
  return result;
}

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
  // 查找用户购物车单条数据（并且将商品信息合并）
  if (goodId) {
    Object.assign(whereOpt, { goodId });
    console.log(`获取用户购物车${JSON.stringify(whereOpt)}`);
    result = await Order_Cart.findOne({
      where: whereOpt,
      include: [
        {
          model: Good_Info
        }
      ]
    });
  } else {
    // 查找用户全部购物车数据（并且将商品信息合并）
    result = await Order_Cart.findAll({
      where: whereOpt,
      include: [
        {
          model: Good_Info
        }
      ]
    });
  }
  if (Object.prototype.toString.call(result) != "[object Array]") {
    result = [result];
  }
  if (result) {
    let cartInfo = [];
    result.forEach(data => {
      if (
        data &&
        data.dataValues &&
        data.dataValues.Good_Info &&
        data.dataValues.Good_Info.dataValues
      ) {
        // 对数据进行处理，并且删掉 Good_Info 的id数据
        let goodInfo = data.dataValues.Good_Info.dataValues;
        // 因为购物车数据中已经有goodId了，所以直接删掉即可
        delete goodInfo.id;
        Object.assign(data.dataValues, goodInfo);
        delete data.dataValues.Good_Info;
        cartInfo.push(data.dataValues);
      }
    });
    if (goodId) {
      // 如果是查找单个购物车数据则直接返回第一项
      return cartInfo[0];
    } else {
      return cartInfo;
    }
  } else {
    return null;
  }
}

/**
 * 更新购物车数据
 * @param {int} userId 用户id
 * @param {int} goodId 商品id
 * @param {int} count 购物车数量
 */
async function updateUserCarts(userId, goodId, count) {
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
  expressCost
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
      expressCost
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

// 删除购物车
async function deleteUserCarts(cartIds) {
  let result = await Order_Cart.destroy({
    where: {
      id: cartIds
    }
  });
  return result;
}

/**
 * 更新购物车
 * @param {int} orders
 */
async function _updateOrder(orderId) {
  await Order_Info.update(
    {
      status: 2
    },
    {
      where: {
        id: orderId
      }
    }
  );
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
  if (oldState == 0) {
    // 将订单状态修改为2，失效状态
    await _updateOrder(orderId);
  }
}

module.exports = {
  getUserCarts,
  checkOrderState,
  deleteUserCarts,
  hanldeUserCarts,
  updateUserCarts,
  createOrderInfo,
  createOrderDetail
};
