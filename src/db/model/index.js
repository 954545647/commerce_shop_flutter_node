/**
 * @description 数据模型入口文件
 */

const User_Address = require("./User/user_address");
const User_Info = require("./User/user_info");
const User_Integral = require("./User/user_integral");
const Good_Comment = require("./Good/good_comment");
const Product_Info = require("./Good/good_info");
const Good_Supplier = require("./Good/good_supplier");
const Order_Cart = require("./Order/order_cart");
const Order_Detail = require("./Order/order_detail");
const Order_Info = require("./Order/order_info");

// 地址表和用户信息主表
User_Address.belongsTo(User_Info, {
  foreignKey: "userId"
});

// 积分表和用户信息主表
User_Integral.belongsTo(User_Info, {
  foreignKey: "userId"
});

module.exports = {
  User_Address,
  User_Info,
  User_Integral,
  Good_Comment,
  Product_Info,
  Good_Supplier,
  Order_Cart,
  Order_Detail,
  Order_Info
};
