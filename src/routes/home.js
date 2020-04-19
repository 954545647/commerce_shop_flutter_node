const router = require("koa-router")();
router.prefix("/home"); // 前缀
const { getHotGood } = require("@controller/goods");
const { getHotFarm } = require("@controller/farm");
const { getWeather } = require("@controller/home");

// 首页热门认养
router.get("/hotAdopts", async ctx => {
  ctx.body = await getHotGood();
});

// 首页热门租地
router.get("/hotFarms", async ctx => {
  ctx.body = await getHotFarm();
});

// 首页天气预报
router.get("/weather", async ctx => {
  ctx.body = await getWeather();
});

// 首页轮播图列表数据
router.get("/homeSwiperImgList", async ctx => {
  try {
    let swiperImgList = [
      {
        url:
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1218413399,3550156096&fm=26&gp=0.jpg"
      },
      {
        url:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1375254066,900171768&fm=26&gp=0.jpg"
      },
      {
        url:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581768176501&di=db6bc203db03619464e1db1940cf9c0c&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2Fsb%2Fwf%2FQJ8618406592.jpg"
      }
    ];
    ctx.body = {
      status: 200,
      data: {
        swiperImgList
      }
    };
  } catch (error) {
    ctx.body = {
      status: 404,
      message: `访问出错${error}`
    };
  }
});

module.exports = router;
