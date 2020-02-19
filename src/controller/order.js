/**
 * @description 订单 controller
 */

const {
  getUserCarts,
  hanldeUserCarts,
  updateUserCarts
} = require("@services/order");

/**
 * 获取用户的购物车
 * @param {int} userId 用户id
 * @param {int} goodId 商品id
 */
async function getCarts(userId, goodId = null) {
  const result = await getUserCarts(userId, goodId);
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
    // 获取成功
    return new global.succ.SuccessModel({ data: cartInfo });
  } else {
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
  expressCount
}) {
  // 是新增购物车
  if (goodName) {
    // 先查看当前数据库中是否已经有该条数据了，如果有就单纯增加数量count
    const result = await getUserCarts(userId, goodId);
    if (result) {
      // 更新购物车
      let num = result.dataValues.count; // 购物车原本数据
      // console.log(num, count, "hahahaha");
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
        expressCount
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

async function updateCarts(userId, goodId, count) {
  const result = await updateUserCarts(userId, goodId, count);
  if (result) {
    // 获取成功
    return new global.succ.SuccessModel({ msg: "更新成功" });
  } else {
    return new global.errs.updateInfoFail();
  }
}

module.exports = {
  handleCarts,
  updateCarts,
  getCarts
};