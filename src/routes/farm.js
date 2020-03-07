/**
 * @description 租地路由
 */
const router = require("koa-router")();
const {
  getFarmInfo,
  getAllFarms,
  newFarmOrder,
  newFarm,
  newCrop
} = require("@controller/farm");
const Auth = require("@middlewares/auth");
router.prefix("/farm");

// 获取单个农场信息
router.post("/getInfo", async ctx => {
  const { id } = ctx.request.body;
  ctx.body = await getFarmInfo(id);
});

// 获取土地列表
router.get("/getAlls", async ctx => {
  ctx.body = await getAllFarms();
});

// 新增农场订单
router.post("/newOrder", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  const {
    couponId,
    farmId,
    orderAmount,
    payMoney,
    address,
    cropsInfos,
    orderUsername,
    supplierId
  } = ctx.request.body;
  ctx.body = await newFarmOrder({
    userId,
    couponId,
    farmId,
    orderAmount,
    payMoney,
    address,
    cropsInfos,
    orderUsername,
    supplierId
  });
});

// 新增土地
router.post("/newFarm", async ctx => {
  const {
    supplierId,
    farmName,
    descript,
    tags,
    totalNum,
    remainNum = totalNum,
    preArea,
    preMoney,
    imgCover,
    address,
    monitor
  } = ctx.request.body;
  ctx.body = await newFarm({
    supplierId,
    farmName,
    descript,
    tags,
    totalNum,
    remainNum,
    preArea,
    preMoney,
    imgCover,
    address,
    monitor
  });
});

// 新增农作物
router.post("/newCrop", async ctx => {
  const { cropName, descript, price, imgCover, farmId } = ctx.request.body;
  ctx.body = await newCrop({
    cropName,
    descript,
    price,
    imgCover,
    farmId
  });
});
module.exports = router;
