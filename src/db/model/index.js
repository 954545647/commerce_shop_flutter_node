/**
 * @description 数据模型入口文件
 */

const User_Address = require("./User/user_address");
const User_Info = require("./User/user_info");
const Good_Comment = require("./Good/good_comment");
const Product_Info = require("./Good/good_info");
const Good_Supplier = require("./Good/good_supplier");
const Order_Cart = require("./Order/order_cart");
const Order_Detail = require("./Order/order_detail");
const Order_Info = require("./Order/order_info");

// 添加外键
User_Address.belongsTo(User_Info, {
  foreignKey: "userId"
});

module.exports = {
  User_Address,
  User_Info,
  Good_Comment,
  Product_Info,
  Good_Supplier,
  Order_Cart,
  Order_Detail,
  Order_Info
};
