/**
 * @description 数据模型入口文件
 */

//  用户
const User_Info = require("./User/user_info");
const User_Address = require("./User/user_address");
const User_Integral = require("./User/user_integral");
const User_Search = require("./User/user_search");
// 商家
const Supplier_Info = require("./User/supplier_info");
// 优惠卷
const Coupon_Info = require("./Coupon/coupon_info");
const Coupon_History = require("./Coupon/coupon_history");
// 订单
const Order_Info = require("./Order/order_info");
const Order_Detail = require("./Order/order_detail");
const Order_Cart = require("./Order/order_cart");
const Farm_Order = require("./Order/farm_order");
const Farm_Order_Detail = require("./Order/farm_order_detail");
// 动物
const Animal_Info = require("./Animal/animal_info");
// 农场
const Farm_Info = require("./Farm/farm_info");
const Farm_Crop = require("./Farm/farm_crop");
const Crop_Info = require("./Farm/crop_info");
// 消息表
const Chat_Info = require("./Socket/chat_info");

// 地址表和用户信息主表
User_Address.belongsTo(User_Info, {
  foreignKey: "userId"
});
// 地址表和用户信息主表
User_Search.belongsTo(User_Info, {
  foreignKey: "userId"
});
// 积分表和用户信息主表
User_Integral.belongsTo(User_Info, {
  foreignKey: "userId"
});
// 优惠卷使用情况表和用户信息主表
Coupon_History.belongsTo(User_Info, {
  foreignKey: "userId"
});
// 优惠卷使用情况表表和优惠卷表
Coupon_History.belongsTo(Coupon_Info, {
  foreignKey: "couponId"
});
// 优惠卷使用情况表表和订单表;
Coupon_History.belongsTo(Order_Info, {
  foreignKey: "orderId"
});
// 优惠卷使用情况表表和订单表;
Coupon_History.belongsTo(Farm_Order, {
  foreignKey: "orderId"
});
// 用户信息表和优惠卷信息表
User_Info.hasMany(Coupon_Info, {
  foreignKey: "userId"
});
// 订单详情表和订单主表
Order_Info.hasMany(Order_Detail, {
  foreignKey: "orderId"
});
Farm_Order.hasMany(Farm_Order_Detail, {
  foreignKey: "orderId"
});
// 商品信息表和商品供应商表
Animal_Info.belongsTo(Supplier_Info, {
  foreignKey: "supplierId",
  targetKey: "id"
});
// 购物车表和商品信息表
Order_Cart.belongsTo(Animal_Info, {
  foreignKey: "goodId"
});
// 购物车表和用户信息表
Order_Cart.belongsTo(User_Info, {
  foreignKey: "userId"
});
Farm_Crop.hasMany(Farm_Info, {
  foreignKey: "farmId"
});
Farm_Crop.hasMany(Crop_Info, {
  foreignKey: "cropId"
});
// 农场信息表和商品供应商表
Farm_Info.belongsTo(Supplier_Info, {
  foreignKey: "supplierId",
  targetKey: "id"
});

// 优惠卷表和商家信息主表
Coupon_Info.belongsTo(Supplier_Info, {
  foreignKey: "source",
  targetKey: "id"
});

module.exports = {
  User_Info,
  User_Address,
  User_Integral,
  User_Search,
  Coupon_Info,
  Order_Info,
  Coupon_History,
  Order_Detail,
  Farm_Order,
  Farm_Order_Detail,
  Supplier_Info,
  Animal_Info,
  Order_Cart,
  Farm_Crop,
  Farm_Info,
  Crop_Info,
  Chat_Info
};
