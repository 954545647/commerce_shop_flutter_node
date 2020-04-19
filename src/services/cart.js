/**
 * @description 购物车 services
 */

const { Order_Cart, Animal_Info } = require("@db/model");

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
    result = await Order_Cart.findOne({
      where: whereOpt,
      include: [
        {
          model: Animal_Info
        }
      ]
    });
  } else {
    // 查找用户全部购物车数据（并且将商品信息合并）
    result = await Order_Cart.findAll({
      where: whereOpt,
      include: [
        {
          model: Animal_Info
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
        data.dataValues.Animal_Info &&
        data.dataValues.Animal_Info.dataValues
      ) {
        // 对数据进行处理，并且删掉 Animal_Info 的id数据
        let goodInfo = data.dataValues.Animal_Info.dataValues;
        // 因为购物车数据中已经有goodId了，所以直接删掉即可
        delete goodInfo.id;
        Object.assign(data.dataValues, goodInfo);
        delete data.dataValues.Animal_Info;
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

module.exports = {
  getUserCarts,
  deleteUserCarts,
  hanldeUserCarts,
  updateUserCarts
};
