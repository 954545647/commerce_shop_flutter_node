/**
 * @description 模拟路由
 */
const router = require("koa-router")();
const { newGoodInfo } = require("@services/goods");
const { newSupplierInfo } = require("@services/supplier");
const { createUser, newUserAddress } = require("@services/user");
const doCrypto = require("@utils/cryp.js");

const {
  createFarmInfo,
  createCropInfo,
  createFarmCrop
} = require("@services/farm");

function generateName(num) {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += String.fromCodePoint(Math.round(Math.random() * 20901) + 19968);
  }
  return str;
}

function generateNum(num) {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

// 新注册用户
router.get("/newUser", async ctx => {
  // 注册
  await createUser({
    username: "123",
    password: doCrypto("123"),
    phone: "13250504940"
  });
  await newSupplierInfo({
    username: "123",
    password: doCrypto("123"),
    phone: "13250504940",
    idNum: "122",
    frontImg: "default_cover.jpg",
    backImg: "default_cover.jpg",
    imgCover: "default_cover.jpg"
  });
  ctx.body = {
    msg: "成功"
  };
});

// 新增默认地址
router.get("/newAddress", async ctx => {
  await newUserAddress({
    id: 1,
    username: "123",
    phone: "13250504940",
    province: "广东省",
    city: "广州市",
    area: "天河区",
    address: "华南农业大学",
    isDefault: true
  });
  ctx.body = {
    msg: "成功"
  };
});

// 随机生成用户
router.get("/newPeople", async ctx => {
  // 注册
  await createUser({
    username: generateNum(3),
    password: doCrypto("123"),
    phone: "13250504940"
  });
  await newSupplierInfo({
    username: generateNum(3),
    password: doCrypto("123"),
    phone: generateNum(11),
    idNum: "122",
    frontImg: "default_cover.jpg",
    backImg: "default_cover.jpg",
    imgCover: "default_cover.jpg"
  });
  ctx.body = {
    msg: "成功"
  };
});

// 新增动物
router.get("/newAnimal", async ctx => {
  // 新增商品
  await newGoodInfo({
    goodName: generateName(2),
    price: Math.floor(Math.random() * 10) + 1,
    descript: generateName(5),
    stock: Math.floor(Math.random() * 100) + 1,
    imgCover: "default_cover.jpg",
    sales: 0,
    expressCost: 0,
    from: "广东广州",
    supplierId: 1
  });
  ctx.body = {
    msg: "成功"
  };
});

// 新增农场
router.get("/newFarm", async ctx => {
  // 新增农场作物关系
  await createFarmCrop(1, 1);
  await createFarmCrop(1, 2);
  await createFarmCrop(2, 3);
  // 新增农场
  await createFarmInfo({
    supplierId: 1,
    farmName: generateName(3),
    descript: generateName(6),
    tags: "无农药;无毒副",
    totalNum: Math.floor(Math.random() * 100) + 1,
    sailNum: 0,
    preArea: 10,
    preMoney: Math.floor(Math.random() * 10) + 1,
    imgCover: "default_cover.jpg",
    address: generateName(7),
    monitor: "https://greenadoption.cn/tempImages/example.mp4"
  });
  await createFarmInfo({
    supplierId: 2,
    farmName: generateName(3),
    descript: generateName(6),
    tags: "无农药;无毒副",
    totalNum: Math.floor(Math.random() * 100) + 1,
    sailNum: 0,
    preArea: 10,
    preMoney: Math.floor(Math.random() * 10) + 1,
    imgCover: "default_cover.jpg",
    address: generateName(7),
    monitor: "https://greenadoption.cn/tempImages/example.mp4"
  });
  // 新增农作物
  await createCropInfo({
    cropName: generateName(3),
    price: Math.floor(Math.random() * 10) + 1,
    descript: generateName(3),
    imgCover: "default_cover.jpg"
  });
  await createCropInfo({
    cropName: generateName(3),
    price: Math.floor(Math.random() * 10) + 1,
    descript: generateName(4),
    imgCover: "default_cover.jpg"
  });
  await createCropInfo({
    cropName: generateName(3),
    price: Math.floor(Math.random() * 10) + 1,
    descript: generateName(4),
    imgCover: "default_cover.jpg"
  });
  ctx.body = {
    msg: "成功"
  };
});

module.exports = router;
