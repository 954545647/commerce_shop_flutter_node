/**
 * @description 消息队列
 */
// https://blog.csdn.net/ligang2585116/article/details/72859359

const { checkOrderState } = require("@services/order");
/**
 *
 * @param {int} orderId 订单id
 */
function doAction(orderId) {
  // 如果循环队列中已存在该orderId，需要先干掉，重新计时
  let orderMap = global.orderMap;
  let orderLoop = global.orderLoop;
  let currentSlotIndex = global.currentSlotIndex;
  let slotIndex = orderMap.get(orderId);
  slotIndex && orderLoop[slotIndex].delete(orderId);
  // 将该orderId重新添加到循环队列中
  // 周期301，新插入的置入当前的后一个（即，300s后可以扫描到它）
  // 更新map中这个orderId的最新slotIndex
  slotIndex = currentSlotIndex - 1;
  orderLoop[slotIndex] = orderLoop[slotIndex]
    ? orderLoop[slotIndex].add(orderId)
    : new Set().add(orderId);
  orderMap.set(orderId, slotIndex);
}

// 每秒钟移动一个slot，这个slot对应的set集合中所有orderId都为超时
// 如果所有slot对应的set集合都为空，则表示没有orderId超时
function startOrderInterval() {
  let orderMap = global.orderMap;
  let orderLoop = global.orderLoop;
  setInterval(function() {
    var slotSet = orderLoop[global.currentSlotIndex];
    // console.log(global.currentSlotIndex);
    if (slotSet && slotSet.size > 0) {
      for (let orderId of slotSet.values()) {
        // 取出订单id，查询数据库该订单的状态，如果状态为未支付则变成失效状态
        checkOrderState(orderId);
        // 到时写入日志
        // console.log(`<订单${orderId}>超过5min未支付，失效！`);
        // 执行完的orderId从map集合中剔除
        orderMap.delete(orderId);
      }
      // 置空该集合
      slotSet.clear();
    }
    // 指标继续+1
    global.currentSlotIndex = ++global.currentSlotIndex % 3001;
  }, 1000);
}

module.exports = {
  doAction,
  startOrderInterval
};
