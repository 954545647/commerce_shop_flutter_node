/**
 * @description 数据模型入口文件
 */

const User_Address = require("./User/user_address");
const User_Info = require("./User/user_info");
const User_Integral = require("./User/user_integral");
const Good_Comment = require("./Good/good_comment");
const Good_Info = require("./Good/good_info");
const Good_Supplier = require("./Good/good_supplier");
const Order_Cart = require("./Order/order_cart");
const Order_Detail = require("./Order/order_detail");
const Order_Info = require("./Order/order_info");
const Coupon_Info = require("./Coupon/coupon_info");
const Coupon_History = require("./Coupon/coupon_history");

// 地址表和用户信息主表
User_Address.belongsTo(User_Info, {
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

// 用户信息表和优惠卷信息表
User_Info.hasMany(Coupon_Info, {
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

// 商品信息表和商品供应商表
Good_Info.belongsTo(Good_Supplier, {
  foreignKey: "supplierId",
  targetKey: "id"
});

// 商品信息表和商品评价表
Good_Comment.belongsTo(Good_Info, {
  foreignKey: "good_id"
});

module.exports = {
  User_Address,
  User_Info,
  User_Integral,
  Good_Comment,
  Good_Info,
  Good_Supplier,
  Order_Cart,
  Order_Detail,
  Order_Info,
  Coupon_Info,
  Coupon_History
};
