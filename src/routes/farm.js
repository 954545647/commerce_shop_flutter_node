/**
 * @description 租地路由
 */
const router = require("koa-router")();
const {
  getFarmInfo,
  getAllFarms,
  getMyFarm,
  newFarmOrder
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
    orderUsername
  } = ctx.request.body;
  ctx.body = await newFarmOrder({
    userId,
    couponId,
    farmId,
    orderAmount,
    payMoney,
    address,
    cropsInfos,
    orderUsername
  });
});

// 获取我的农场
router.get("/myFarm", new Auth().token, async ctx => {
  const userId = ctx.auth.id;
  ctx.body = await getMyFarm(userId);
});
module.exports = router;
