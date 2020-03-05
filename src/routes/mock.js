/**
 * @description 模拟路由
 */
const router = require("koa-router")();
const { newGood } = require("@controller/goods");
const { newSupplier } = require("@controller/supplier");
const { register } = require("@controller/user");
const { newCoupon } = require("@controller/coupon");
const {
  createFarmInfo,
  createCropInfo,
  createFarmCrop
} = require("@services/farm");

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
    username: "头盔汉堡",
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
    goodName: "黄牛",
    price: "12",
    descript: "板扎的牛牛",
    stock: 100,
    imgCover:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583050277509&di=57aa5e04138b492319cf70a20c73c426&imgtype=0&src=http%3A%2F%2Foss.huangye88.net%2Flive%2Fimport%2Fnews%2Fzzpd2295297.jpg",
    sales: 0,
    expressCost: 0,
    from: "广东广州",
    supplierId: 1
  });
  await newGood({
    goodName: "农家土鸡",
    price: "2",
    descript: "肉质酥松，富有弹性",
    stock: 200,
    imgCover:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583050042655&di=befa645bbb694f6b5c6c774b0f364bc7&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150911%2Fmp30864430_1441964009353_2_th.jpeg",
    sales: 0,
    expressCost: 0,
    from: "四川合江县",
    supplierId: 2
  });
  await newGood({
    goodName: "农家土猪",
    price: "12",
    descript: "纯猪草喂养",
    stock: 10,
    imgCover:
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583050213175&di=bfa4b17590379fd9ecca9234dc61e477&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190309%2F1254f2864d534f579be6da05bab7782a.jpeg",
    sales: 0,
    expressCost: 0,
    from: "广东广州",
    supplierId: 1
  });
  // 新增优惠卷
  await newCoupon({
    name: "满100-20",
    type: 0,
    with_amount: 100,
    used_amount: 20
  });
  await newCoupon({
    name: "满20-2",
    type: 0,
    with_amount: 20,
    used_amount: 2
  });
  // 新增农场作物关系
  await createFarmCrop(1, 1);
  await createFarmCrop(1, 2);
  await createFarmCrop(2, 3);
  // 新增农场
  await createFarmInfo({
    supplierId: 1,
    farmName: "岭南蔬菜基地",
    descript: "该农场暂无简介",
    tags: "无农药;无毒副",
    totalNum: 30,
    remainNum: 30,
    preArea: 10,
    imgCover:
      "https://greenadoption.cn/tempImages/25bba4afda1e43a7a5fdbb4c5b9a2496.jpg",
    address: "广东省广州市天河区华南农业大学华山区第17栋学生宿舍",
    monitor: "https://greenadoption.cn/tempImages/example.mp4"
  });
  await createFarmInfo({
    supplierId: 2,
    farmName: "五山水果种植园",
    descript: "该农场暂无简介",
    tags: "无农药;无毒副",
    totalNum: 30,
    remainNum: 30,
    preArea: 30,
    imgCover:
      "https://greenadoption.cn/tempImages/25bba4afda1e43a7a5fdbb4c5b9a2496.jpg",
    address: "广东省广州市天河区华南农业大学华山区第17栋学生宿舍",
    monitor: "https://www.runoob.com/try/demo_source/mov_bbb.mp4"
  });
  // 新增农作物
  await createCropInfo({
    cropName: "生菜",
    price: 3,
    descript: "降火，补充维生素",
    imgCover: "https://greenadoption.cn/tempImages/shengcai.jpg"
  });
  await createCropInfo({
    cropName: "大白菜",
    price: 4,
    descript: "降火，补充维生素",
    imgCover: "https://greenadoption.cn/tempImages/dabaicai.jpg"
  });
  await createCropInfo({
    cropName: "番茄",
    price: 4,
    descript: "高维生素C",
    imgCover: "https://greenadoption.cn/tempImages/fanqie.jpg"
  });

  ctx.body = {
    msg: "成功"
  };
});

router.get("/newGood", async ctx => {
  // 新增商品
  await newGood({
    goodName: "鸡翅",
    price: "12",
    descript: "纯手工研制",
    stock: 100,
    imgCover:
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3399136315,3692942871&fm=11&gp=0.jpg",
    sales: 0,
    expressCost: 0,
    from: "广东广州",
    supplierId: 1
  });
});

module.exports = router;
