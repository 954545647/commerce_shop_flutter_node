/**
 * @description 模拟路由
 */
const router = require("koa-router")();
const { newGood } = require("@controller/goods");
const { newSupplier } = require("@controller/supplier");
const { register } = require("@controller/user");
const { newCoupon } = require("@controller/coupon");

// 在此一键各种数据
router.get("/mock", async ctx => {
  // 注册
  await register({
    username: "123",
    password: "123",
    phone: "13250504940"
  });
  // 新增供应商
  await newSupplier({
    name: "头盔汉堡",
    phone: "13250504940",
    address: "广东揭阳",
    cover:
      "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=847580354,2285435867&fm=26&gp=0.jpg"
  });
  await newSupplier({
    name: "四川名小吃",
    phone: "13250504940",
    address: "四川光明店",
    cover:
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2822313456,3392103754&fm=26&gp=0.jpg"
  });
  // 新增商品
  await newGood({
    goodName: "汉堡",
    price: "12",
    descript: "好吃的汉堡",
    stock: 100,
    imgCover:
      "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1582442273&di=3e18431e04e6d15a3183ba8ca6593797&src=http://imgs.91cy.cn/net91/19-03-21/20190321200223kbev8056.jpg",
    sales: 0,
    expressCost: 0,
    from: "广东广州",
    supplierId: 1
  });
  await newGood({
    goodName: "土豆",
    price: "2",
    descript: "新鲜的土豆",
    stock: 200,
    imgCover:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3640308417,1716820095&fm=26&gp=0.jpg",
    sales: 0,
    expressCost: 0,
    from: "四川合江县",
    supplierId: 2
  });
  // 新增优惠卷
  await newCoupon({
    name: "满100-20",
    type: 0,
    with_amount: 100,
    used_amount: 20
  });
  ctx.body = {
    msg: "成功"
  };
});

module.exports = router;
